using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;

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

        public GeopointService(IRepository<GeoPoint> pointRepo)
        {
            _pointRepo = pointRepo;
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
            return new OperationResult<GeoPoint>
            {
                Data = _pointRepo.Add(item),
                Messages = new[] { "Geopoint was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Update(GeoPoint item)
        {
            return new OperationResult<GeoPoint>
            {
                Data = _pointRepo.Update(item),
                Messages = new[] { "Geopoint was successfully edited." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Delete(GeoPoint item)
        {
            try
            {
                _pointRepo.Delete(item);
            }
            catch (Exception ex)
            {
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

            if (pointIds.Any())
            {
                return new OperationResult
                {
                    Messages = new[] { "There are no given valid geolist Id" }
                };
            }

            var messages = new List<string>();

            foreach (var id in pointIds)
            {
                var isPointId = Guid.TryParse(id, out Guid pointId);

                if (!isPointId)
                {
                    messages.Add($"Given geopointId = [{id}] is not valid");
                    continue;
                }

                var point = Get(x => x.Id == pointId).FirstOrDefault();

                if (point == null)
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

        public bool IsPointExistWithThisId(string id, Guid listId, out GeoPoint point)
        {
            var isPointId = Guid.TryParse(id, out Guid pointId);
            point = null;
            if (!isPointId)
            {
                return false;
            }

            point = Get(x => x.ListId == listId && x.Id == pointId).FirstOrDefault();
            if (point == null)
            {
                return false;
            }

            return true;
        }
    }
}
