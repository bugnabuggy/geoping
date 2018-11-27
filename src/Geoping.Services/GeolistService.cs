using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;

namespace Geoping.Services
{
    public class GeolistService : IGeolistService
    {
        private readonly Dictionary<string, Expression<Func<GeoList, object>>> orderCommonBys =
            new Dictionary<string, Expression<Func<GeoList, object>>>()
        {
            {"name", x => x.Name},
            {"dateCreated", x => x.Created},
            {"dateEdited", x => x.Edited},
            {"isPublic", x => x.IsPublic}
        };

        private Dictionary<string, Expression<Func<PublicListDTO, object>>> orderPublicBys =
            new Dictionary<string, Expression<Func<PublicListDTO, object>>>()
        {
            {"name", x => x.Name},
            {"author", x => x.OwnerName},
            {"dateCreated", x => x.CreateDate},
            {"dateEdited", x => x.EditDate},
            {"datePublished", x => x.PublishDate},
            {"rating", x => x.Rating},
            {"subs", x => x.SubscribersNumber},
            {"finihers", x => x.FinishersNumber},
            {"isOfficial", x => x.IsOfficial}
        };


        private IRepository<GeoList> _geolistRepo;
        private IRepository<PublicList> _publicGeolistRepo;
        private IRepository<GeoPingUser> _gpUserRepo;
        private ISecurityService _securitySrv;

        public GeolistService(IRepository<GeoList> geolistRepo,
                              IRepository<PublicList> publicGeolistRepo,
                              IRepository<GeoPingUser> gpUserRepo,
                              ISecurityService securitySrv)
        {
            _geolistRepo = geolistRepo;
            _publicGeolistRepo = publicGeolistRepo;
            _gpUserRepo = gpUserRepo;
            _securitySrv = securitySrv;
        }

        public IQueryable<GeoList> Get()
        {
            return _geolistRepo.Get();
        }

        public IQueryable<GeoList> Get(Expression<Func<GeoList, bool>> func)
        {
            return _geolistRepo.Get(func);
        }

        public WebResult<IQueryable<GeoList>> GetByFilter(Guid userId, UsersGeolistFilterDTO filter, out int totalItems)
        {
            var data = _geolistRepo.Get(x => x.OwnerId == userId);

            // Filtering by public status. There is no filtering if isPublic field in filter is null
            if (filter.IsPublic != null)
            {
                data = data.Where(x => x.IsPublic == filter.IsPublic);
            }

            data = FilterListsByCommonFilter(data, filter);

            totalItems = data.Count();

            data = PaginationByCommonFilter(data, filter);

            return new WebResult<IQueryable<GeoList>>()
            {
                Data = data,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems,
            };
        }

        public WebResult<IQueryable<PublicListDTO>> GetByFilter(Guid ownerId, PublicGeolistFilterDTO filter, out int totalItems)
        {
            var data = _geolistRepo.Get(x => x.IsPublic == true && 
                                             x.OwnerId == ownerId);

            var result = GetPublicByFilter(data, filter);

            totalItems = result.Count();

            return new WebResult<IQueryable<PublicListDTO>>()
            {
                Data = result,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems,
            };
        }

        public WebResult<IQueryable<PublicListDTO>> GetByFilter(PublicGeolistFilterDTO filter, out int totalItems)
        {
            var data = _geolistRepo.Get(x => x.IsPublic == true);

            var result = GetPublicByFilter(data, filter);

            totalItems = result.Count();

            return new WebResult<IQueryable<PublicListDTO>>()
            {
                Data = result,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems,
            };
        }

        public OperationResult<GeoList> Add(GeoList item)
        {
            var result = _geolistRepo.Add(item);

            if (item.IsPublic)
            {
                _publicGeolistRepo.Add(new PublicList()
                {
                    ListId = result.Id,
                    PublishDate = DateTime.UtcNow
                });
            }

            return new OperationResult<GeoList>()
            {
                Data = result,
                Messages = new[] { "Geolist was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoList> Update(Guid userId, GeoList item)
        {
            if (!_securitySrv.IsUserHasAccessToManipulateList(userId, item))
            {
                return new OperationResult<GeoList>()
                {
                    Messages = new[] { "You have no rights to maniputale this list" }
                };
            }

            if (item.IsPublic)
            {
                var wasPublic = _publicGeolistRepo.Get().Any(x => x.ListId == item.Id);
                if (!wasPublic)
                {
                    _publicGeolistRepo.Add(new PublicList()
                    {
                        ListId = item.Id,
                        PublishDate = DateTime.UtcNow
                    });
                }
            }
            var result = _geolistRepo.Update(item);

            return new OperationResult<GeoList>()
            {
                Data = result,
                Messages = new[] { "Geolist was successfully edited." },
                Success = true
            };
        }

        // Delete one of list
        public OperationResult<GeoList> Delete(Guid userId, GeoList item)
        {
            if (!_securitySrv.IsUserHasAccessToManipulateList(userId, item))
            {
                return new OperationResult<GeoList>()
                {
                    Messages = new[] { $"You have no rights to manipulate list with Id = [{item.Id}]." }
                };
            }

            var result = _geolistRepo.Delete(item);

            var publicList = _publicGeolistRepo.Data.FirstOrDefault(x => x.ListId == item.Id);

            if (publicList != null)
            {
                _publicGeolistRepo.Delete(publicList);
            }

            return new OperationResult<GeoList>()
            {
                Messages = new[] { $"Geolist with Id = [{item.Id}] was successfully removed." },
                Success = true
            };
        }

        // Delete several lists
        public OperationResult Delete(Guid userId, string Ids)
        {
            var ids = Ids.Split(new char[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries)
                            .ToArray();

            if (ids == null)
            {
                return new OperationResult()
                {
                    Messages = new[] { "There are no given valid geolist Id" }
                };
            }

var messages = new List<string>();

            foreach (var id in ids)
            {
                var isListId = Guid.TryParse(id, out Guid listId);

                if (!isListId)
                {
                    messages.Add($"Given geolistId = [{id}] is not valid");
                    continue;
                }

                var list = Get(x => x.Id == listId).FirstOrDefault();

                if (list == null)
                {
                    messages.Add($"There are no geolist with given geolistId = [{id}]");
                    continue;
                }

                messages.AddRange(Delete(userId, list).Messages);
            }

            return new OperationResult()
            {
                Success = true,
                Messages = messages.AsEnumerable()
            };
        }

        public bool IsListExistWithThisId(string Id, out GeoList list)
        {
            var isListId = Guid.TryParse(Id, out Guid listId);
            list = null;
            if (!isListId)
            {
                return false;
            }

            list = Get(x => x.Id == listId).FirstOrDefault();
            if (list == null)
            {
                return false;
            }

            return true;
        }

        private IQueryable<PublicListDTO> GetPublicByFilter(IQueryable<GeoList> data, PublicGeolistFilterDTO filter)
        {
            data = FilterListsByCommonFilter(data, filter);

            var publicData = from a in data
                             from b in _publicGeolistRepo.Get()
                             where a.Id == b.ListId
                             select new PublicListDTO
                             {
                                 Id = a.Id,
                                 Name = a.Name,
                                 Description = a.Description,
                                 OwnerId = a.OwnerId,
                                 OwnerName = _gpUserRepo.Get().FirstOrDefault(x => x.Id == a.OwnerId).Login,
                                 CreateDate = a.Created,
                                 EditDate = a.Edited,
                                 PublishDate = b.PublishDate,
                                 Rating = b.Rating,
                                 SubscribersNumber = b.SubscribersNumber,
                                 FinishersNumber = b.FinishersNumber,
                                 IsOfficial = b.IsOfficial
                             };

            publicData = FilterListsByPublicFilter(publicData, filter);

            publicData = PaginationByPublicFilter(publicData, filter);

            return publicData;
        }

        private IQueryable<GeoList> FilterListsByCommonFilter
            (IQueryable<GeoList> data, GeolistFilterDTO filter)
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

        private IQueryable<PublicListDTO> FilterListsByPublicFilter
            (IQueryable<PublicListDTO> data, PublicGeolistFilterDTO filter)
        {
            if (filter.IsOfficial != null)
            {
                data = data.Where(x => x.IsOfficial == filter.IsOfficial);
            }

            var isPublishedFrom = DateTime.TryParse(filter.DatePublishFrom, out DateTime publishedFrom);
            var isPublishedTo = DateTime.TryParse(filter.DatePublishTo, out DateTime publishedTo);

            // Filtering by publish date
            data = isPublishedFrom
                 ? data.Where(x => x.PublishDate >= publishedFrom)
                 : data;

            data = isPublishedTo
                 ? data.Where(x => x.PublishDate <= publishedTo)
                 : data;

            // Filtering by author name
            data = !string.IsNullOrEmpty(filter.Author)
                     ? data.Where(x => x.OwnerName.Contains(filter.Author))
                     : data;

            // Filtering by rating
            data = filter.RatingFrom != null
                 ? data.Where(x => x.Rating >= filter.RatingFrom)
                 : data;

            data = filter.RatingTo != null
                 ? data.Where(x => x.Rating <= filter.RatingTo)
                 : data;

            // Filtering by subscribers number 
            data = filter.SubsFrom != null
                 ? data.Where(x => x.SubscribersNumber >= filter.SubsFrom)
                 : data;

            data = filter.SubsTo != null
                 ? data.Where(x => x.SubscribersNumber <= filter.SubsTo)
                 : data;

            // Filtering by finishers number 
            data = filter.FinishersFrom != null
                 ? data.Where(x => x.FinishersNumber >= filter.FinishersFrom)
                 : data;

            data = filter.FinishersTo != null
                 ? data.Where(x => x.FinishersNumber <= filter.FinishersTo)
                 : data;

            return data;
        }

        private IQueryable<GeoList> PaginationByCommonFilter
            (IQueryable<GeoList> data, GeolistFilterDTO filter)
        {
            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && orderCommonBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = orderCommonBys[filter.OrderBy];

                if (filter.IsDesc)
                {
                    data.OrderByDescending(orderExpression);
                }
                else
                {
                    data.OrderBy(orderExpression);
                }
            }

            if (filter.PageSize != null)
            {
                data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            return data;
        }

        private IQueryable<PublicListDTO> PaginationByPublicFilter
            (IQueryable<PublicListDTO> data, PublicGeolistFilterDTO filter)
        {
            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && orderPublicBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = orderPublicBys[filter.OrderBy];

                if (filter.IsDesc)
                {
                    data.OrderByDescending(orderExpression);
                }
                else
                {
                    data.OrderBy(orderExpression);
                }
            }

            if (filter.PageSize != null)
            {
                data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            return data;
        }
    }
}
