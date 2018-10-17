using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.DTO;
using GeoPing.Api.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace GeoPing.Api.Services
{
    public class GeopointService : IGeopointService
    {
        private Dictionary<string, Expression<Func<GeoPoint, object>>> orderBys =
            new Dictionary<string, Expression<Func<GeoPoint, object>>>()
            {
                { "name", x => x.Name }
            };

        private IRepository<GeoPoint> _pointRepo;
        private IRepository<UserPoint> _userPointsRepo;

        public GeopointService(IRepository<GeoPoint> pointRepo,
                               IRepository<UserPoint> userPointsRepo)
        {
            _pointRepo = pointRepo;
            _userPointsRepo = userPointsRepo;
        }

        public IQueryable<GeoPoint> Get()
        {
            return _pointRepo.Data;
        }

        public IQueryable<GeoPoint> Get(Expression<Func<GeoPoint, bool>> func)
        {
            return _pointRepo.Data.Where(func);
        }

        public WebResult<IQueryable<GeoPoint>> GetByFilter(string listId, GeopointFilterDTO filter, out int totalItems)
        {
            var data = _pointRepo.Data.Where(x => x.GeoListId == Guid.Parse(listId));

            // Filtering by name
            data = !string.IsNullOrEmpty(filter.NameContains)
                 ? data.Where(x => x.Name.Contains(filter.NameContains))
                 : data;

            totalItems = data.Count();

            if(!string.IsNullOrWhiteSpace(filter.OrderBy) && orderBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = orderBys[filter.OrderBy];

                if(filter.IsDesc)
                {
                    data = data.OrderByDescending(orderExpression);
                }
                else
                {
                    data = data.OrderBy(orderExpression);
                }
            }

            filter.PageNumber = filter.PageNumber ?? 0;

            if(filter.PageSize != null)
            {
                data = data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                           .Take((int)filter.PageSize);
            }

            return new WebResult<IQueryable<GeoPoint>>()
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
            return new OperationResult<GeoPoint>()
            {
                Data = _pointRepo.Add(item),
                Messages = new[] { "Geopoint was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Update(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _pointRepo.Update(item),
                Messages = new[] { "Geopoint was successfully edited." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Delete(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _pointRepo.Delete(item),
                Messages = new[] { "Geopoint was successfully removed." },
                Success = true
            };
        }

        public OperationResult CheckPoint(GeoPoint point, string userId)
        {
            var result = _userPointsRepo.Add(new UserPoint
            {
                UserId = userId,
                PointId = point.Id,
                CheckTime = DateTime.Now
            });

            return new OperationResult()
            {
                Data = result,
                Success = true,
                Messages = new[] { $"Geopoint with Id = [{result.PointId}] was successfully checked in by user with Id = [{result.UserId}]" }
            };
        }
    }
}
