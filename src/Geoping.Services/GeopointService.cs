using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Logging;

namespace GeoPing.Services
{
    public class GeopointService : IGeopointService
    {
        private Dictionary<string, Expression<Func<GeoPoint, object>>> _orderBys =
            new Dictionary<string, Expression<Func<GeoPoint, object>>>
            {
                { "name", x => x.Name }
            };

        private IRepository<GeoPoint> _pointRepo;
        private ILogger<GeopointService> _logger;

        public GeopointService
            (IRepository<GeoPoint> pointRepo,
            ILogger<GeopointService> logger)
        {
            _pointRepo = pointRepo;
            _logger = logger;
        }

        public IQueryable<GeoPoint> Get()
        {
            return _pointRepo.Get();
        }

        public IQueryable<GeoPoint> Get(Expression<Func<GeoPoint, bool>> func)
        {
            return _pointRepo.Get(func);
        }

        public WebResult<IQueryable<GeoPoint>> GetByFilter(Guid listId, GeopointFilterDTO filter, out int totalItems)
        {
            _logger.LogInformation($"Getting geopoints of geolist with Id = [{listId}] by filter.");

            var data = _pointRepo.Get(x => x.ListId == listId);

            // Filtering by name
            data = !string.IsNullOrEmpty(filter.Name)
                 ? data.Where(x => x.Name.Contains(filter.Name))
                 : data;

            // Filtering by address
            data = !string.IsNullOrEmpty(filter.OnAddress)
                 ? data.Where(x => x.Address.Contains(filter.OnAddress))
                 : data;

            totalItems = data.Count();

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && _orderBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = _orderBys[filter.OrderBy];

                if (filter.IsDesc)
                {
                    data = data.OrderByDescending(orderExpression);
                }
                else
                {
                    data = data.OrderBy(orderExpression);
                }
            }

            filter.PageNumber = filter.PageNumber ?? 0;

            if (filter.PageSize != null)
            {
                data = data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                           .Take((int)filter.PageSize);
            }

            return new WebResult<IQueryable<GeoPoint>>
            {
                Data = data,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public OperationResult<GeoPoint> Add(GeoPoint item)
        {
            _logger.LogInformation($"Creating geopoint of geolist with Id = [{item.ListId}].");

            return new OperationResult<GeoPoint>
            {
                Data = _pointRepo.Add(item),
                Messages = new[] { "Geopoint was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Update(GeoPoint item)
        {
            _logger.LogInformation($"Editing geopoint with Id = [{item.Id}] " +
                                   $"of geolist with Id = [{item.ListId}].");

            return new OperationResult<GeoPoint>
            {
                Data = _pointRepo.Update(item),
                Messages = new[] { "Geopoint was successfully edited." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Delete(GeoPoint item)
        {
            _logger.LogInformation($"Deleting geopoint with Id = [{item.Id}] " +
                                   $"of geolist with Id = [{item.ListId}].");

            try
            {
                _pointRepo.Delete(item);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while deleting geopoint.", ex);

                return new OperationResult<GeoPoint>
                {
                    Messages = new[] { ex.Message }
                };
            }

            return new OperationResult<GeoPoint>
            {
                Messages = new[] { $"Geopoint with Id = [{item.Id}] was successfully removed." },
                Success = true
            };
        }

        public OperationResult Delete(string ids)
        {
            var pointIds = ids.Split(new [] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries)
                             .ToArray();

            if (!pointIds.Any())
            {
                return new OperationResult
                {
                    Messages = new[] { "There are no given valid geolist Id" }
                };
            }

            var messages = new List<string>();

            foreach (var id in pointIds)
            {
                if (!TryGetPointWithId(id, out var point))
                {
                    messages.Add($"There are no geopoint with given geopointId = [{id}]");
                    continue;
                }

                messages.AddRange(Delete(point).Messages);
            }

            return new OperationResult
            {
                Success = true,
                Messages = messages.AsEnumerable()
            };
        }

        public bool IsPointExistWithId(string pointId)
        {
            var isId = Guid.TryParse(pointId, out var id);

            if (!isId)
            {
                return false;
            }

            var point = Get().FirstOrDefault(x => x.Id == id);
            return point != null;
        }

        public bool IsPointExistWithId(string pointId, Guid listId)
        {
            var isId = Guid.TryParse(pointId, out var id);

            if (!isId)
            {
                return false;
            }

            var point = Get().FirstOrDefault(x => x.ListId == listId &&
                                                  x.Id == id);
            return point != null;
        }

        public bool TryGetPointWithId(string pointId, out GeoPoint point)
        {
            var isId = Guid.TryParse(pointId, out var id);

            if (!isId)
            {
                point = null;

                return false;
            }

            point = _pointRepo.Data.FirstOrDefault(x => x.Id == id);

            return point != null;
        }

        public bool TryGetPointWithId(string pointId, Guid listId, out GeoPoint point)
        {
            var isId = Guid.TryParse(pointId, out var id);

            if (!isId)
            {
                point = null;

                return false;
            }

            point = _pointRepo.Data.FirstOrDefault(x => x.ListId == listId && 
                                                        x.Id == id);
            return point != null;
        }
    }
}
