using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Logging;

namespace GeoPing.Services
{
    public class GeolistService : IGeolistService
    {
        private readonly Dictionary<string, Expression<Func<GeoList, object>>> _orderBys =
            new Dictionary<string, Expression<Func<GeoList, object>>>
            {
            {"name", x => x.Name},
            {"dateCreated", x => x.Created},
            {"dateEdited", x => x.Edited},
            {"isPublic", x => x.IsPublic}
        };


        private IRepository<GeoList> _geolistRepo;
        private IRepository<PublicList> _publicGeolistRepo;
        private IRepository<GeoPingUser> _gpUserRepo;
        private IRepository<ListSharing> _sharingRepo;
        private ISecurityService _securitySrv;
        private ILogger<GeolistService> _logger;

        public GeolistService
            (IRepository<GeoList> geolistRepo, 
            IRepository<PublicList> publicGeolistRepo, 
            IRepository<GeoPingUser> gpUserRepo, 
            ISecurityService securitySrv,
            IRepository<ListSharing> sharingRepo,
            ILogger<GeolistService> logger)
        {
            _geolistRepo = geolistRepo;
            _publicGeolistRepo = publicGeolistRepo;
            _gpUserRepo = gpUserRepo;
            _securitySrv = securitySrv;
            _sharingRepo = sharingRepo;
            _logger = logger;
        }

        public IQueryable<GeoList> Get()
        {
            _logger.LogDebug("Getting all of geolist");

            return _geolistRepo.Get();
        }

        public IQueryable<GeoList> Get(Expression<Func<GeoList, bool>> func)
        {
            _logger.LogDebug($"Getting geolists by query {func.Body.ToString()}");

            return _geolistRepo.Get(func);
        }

        public IQueryable<GeoList> GetAllowedLists(Guid userId)
        {
            _logger.LogDebug($"Getting allowed geolists for user Id = [{userId}]");

            var sharings = _sharingRepo.Get(x => x.UserId == userId &&
                                                 x.Status == "accepted");

            var result = _geolistRepo.Get(x => x.OwnerId == userId ||
                                               sharings.Any(y => y.ListId == x.Id));

            return result;
        }

        public WebResult<IQueryable<GeoList>> GetByFilter(Guid userId, UsersGeolistFilterDTO filter, out int totalItems)
        {
            _logger.LogDebug($"Getting owned geolists by filter for user Id = [{userId}]");

            var data = _geolistRepo.Get(x => x.OwnerId == userId);

            // Filtering by public status. There is no filtering if isPublic field in filter is null
            if (filter.IsPublic != null)
            {
                data = data.Where(x => x.IsPublic == filter.IsPublic);
            }

            data = FilterListsByFilter(data, filter);

            totalItems = data.Count();

            data = PaginateByFilter(data, filter);

            return new WebResult<IQueryable<GeoList>>
            {
                Data = data,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public OperationResult<GeoList> Add(GeoList item)
        {
            _logger.LogInformation($"Creating new list: Name = [{item.Name}], " +
                                   $"Creator = [{item.OwnerId}].");

            var result = _geolistRepo.Add(item);

            // TODO: REFACTOR THIS PART: MOVE CREATION AND CHECK FOR EXISTENCE PUBLIC PART TO PUBLIC SERVICE

            if (item.IsPublic)
            {
                _publicGeolistRepo.Add(new PublicList
                {
                    ListId = result.Id,
                    PublishDate = DateTime.UtcNow
                });
            }

            return new OperationResult<GeoList>
            {
                Data = result,
                Messages = new[] { "Geolist was successfully added." },
                Success = true
            };
        }

        public async Task<OperationResult<GeoList>> Update(Guid userId, GeoList item)
        {
            _logger.LogInformation($"Editing list: ListId = [{item.Id}], " +
                                   $"ListName = [{item.Name}], " +
                                   $"Editor = [{userId}]");

            if (!await _securitySrv.IsUserHasAccessToManipulateList(userId, item))
            {
                _logger.LogWarning($"An error was occured while editing geolist id = [{item.Id}]: " +
                                       $"user Id = [{userId}] has no rights to do this.");

                return new OperationResult<GeoList>
                {
                    Messages = new[] { "Unauthorized", "You have no rights to manipulate this list" }
                };
            }

            if (item.IsPublic)
            {
                // TODO: REFACTOR THIS PART: MOVE CREATION AND CHECK FOR EXISTENCE PUBLIC PART TO PUBLIC SERVICE

                var wasPublic = _publicGeolistRepo.Get().Any(x => x.ListId == item.Id);
                if (!wasPublic)
                {
                    _publicGeolistRepo.Add(new PublicList
                    {
                        ListId = item.Id,
                        PublishDate = DateTime.UtcNow
                    });
                }
            }

            var result = _geolistRepo.Update(item);

            _logger.LogInformation($"List was edited: ListId = [{item.Id}], " +
                                   $"ListName = [{item.Name}], " +
                                   $"Editor = [{userId}]");

            return new OperationResult<GeoList>
            {
                Data = result,
                Messages = new[] { "Geolist was successfully edited." },
                Success = true
            };
        }

        // Delete one of list
        public async Task<OperationResult<GeoList>> Delete(Guid userId, GeoList item)
        {
            _logger.LogInformation($"Deleting list: Id = [{item.Id}], " +
                                   $"Name = [{item.Name}], " +
                                   $"Creator = [{item.OwnerId}]");

            if (!await _securitySrv.IsUserHasAccessToManipulateList(userId, item))
            {
                _logger.LogWarning($"An error was occured while deleting geolist id = [{item.Id}]: " +
                                   $"user Id = [{userId}] has no rights to do this.");

                return new OperationResult<GeoList>
                {
                    Messages = new[] { "Unauthorized", $"You have no rights to manipulate list with Id = [{item.Id}]." }
                };
            }

            _geolistRepo.Delete(item);

            _logger.LogInformation($"List was deleted: Id = [{item.Id}], " +
                                   $"Name = [{item.Name}], " +
                                   $"Creator = [{item.OwnerId}]");

            return new OperationResult<GeoList>
            {
                Messages = new[] { $"Geolist with Id = [{item.Id}] was successfully removed." },
                Success = true
            };
        }

        // Delete several lists
        public async Task<OperationResult> Delete(Guid userId, string listIds)
        {
            var ids = listIds.Split(new[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries)
                             .ToArray();

            if (ids.Any())
            {
                return new OperationResult
                {
                    Messages = new[] { "There are no given valid geolist Id" }
                };
            }

            var messages = new List<string>();

            foreach (var id in ids)
            {
                if (!TryGetListWithId(id, out var list))
                {
                    messages.Add($"There are no geolist with given geolistId = [{id}]");
                    continue;
                }

                messages.AddRange((await Delete(userId, list)).Messages);
            }

            return new OperationResult
            {
                Success = true,
                Messages = messages.AsEnumerable()
            };
        }

        public bool IsListExistWithId(string listId)
        {
            var isId = Guid.TryParse(listId, out var id);

            if (!isId)
            {
                return false;
            }

            var list = Get().FirstOrDefault(x => x.Id == id);

            return list != null;
        }

        public bool TryGetListWithId(string listId, out GeoList list)
        {
            var isId = Guid.TryParse(listId, out var id);

            if (!isId)
            {
                list = null;

                return false;
            }

            list = _geolistRepo.Data.FirstOrDefault(x => x.Id == id);

            return list != null;
        }

        public IQueryable<GeoList> FilterListsByFilter(IQueryable<GeoList> data, GeolistFilterDTO filter)
        {
            var isCreatedFrom = DateTime.TryParse(filter.DateCreatedFrom, out DateTime createdFrom);
            var isCreatedTo = DateTime.TryParse(filter.DateCreatedTo, out DateTime createdTo);
            var isEditedFrom = DateTime.TryParse(filter.DateEditedFrom, out DateTime editedFrom);
            var isEditedTo = DateTime.TryParse(filter.DateEditedTo, out DateTime editedTo);

            // Filtering by name
            data = !string.IsNullOrEmpty(filter.Name)
                 ? data.Where(x => x.Name.Contains(filter.Name))
                 : data;

            // Filtering by creation date
            data = isCreatedFrom
                 ? data.Where(x => x.Created >= createdFrom)
                 : data;

            data = isCreatedTo
                 ? data.Where(x => x.Created <= createdTo)
                 : data;

            // Filtering by editing date
            data = isEditedFrom
                 ? data.Where(x => x.Edited >= editedFrom)
                 : data;

            data = isEditedTo
                 ? data.Where(x => x.Edited <= editedTo)
                 : data;

            return data;
        }

        private IQueryable<GeoList> PaginateByFilter(IQueryable<GeoList> data, StandartFilterDTO filter)
        {
            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && _orderBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = _orderBys[filter.OrderBy];

                data = filter.IsDesc 
                    ? data.OrderByDescending(orderExpression) 
                    : data.OrderBy(orderExpression);
            }

            if (filter.PageSize != null)
            {
                data = data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            return data;
        }
    }
}
