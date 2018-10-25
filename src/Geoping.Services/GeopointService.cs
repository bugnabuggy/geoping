using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Geoping.Services
{
    public class GeopointService : IGeopointService
    {
        //private Dictionary<string, Expression<Func<GeoPoint, object>>> orderBys =
        //    new Dictionary<string, Expression<Func<GeoPoint, object>>>()
        //    {
        //        { "name", x => x.Name }
        //    };

        private IRepository<GeoPoint> _pointRepo;

        public GeopointService(IRepository<GeoPoint> pointRepo)
        {
            _pointRepo = pointRepo;
        }

        public IQueryable<GeoPoint> Get()
        {
            return _pointRepo.Data;
        }

        public IQueryable<GeoPoint> Get(Expression<Func<GeoPoint, bool>> func)
        {
            return _pointRepo.Data.Where(func);
        }

        //public WebResult<IQueryable<GeoPoint>> GetByFilter(string listId, GeopointFilterDTO filter, out int totalItems)
        //{
        //    var data = _pointRepo.Data.Where(x => x.GeoListId == Guid.Parse(listId));

        //    // Filtering by name
        //    data = !string.IsNullOrEmpty(filter.NameContains)
        //         ? data.Where(x => x.Name.Contains(filter.NameContains))
        //         : data;

        //    totalItems = data.Count();

        //    if(!string.IsNullOrWhiteSpace(filter.OrderBy) && orderBys.ContainsKey(filter.OrderBy))
        //    {
        //        var orderExpression = orderBys[filter.OrderBy];

        //        if(filter.IsDesc)
        //        {
        //            data = data.OrderByDescending(orderExpression);
        //        }
        //        else
        //        {
        //            data = data.OrderBy(orderExpression);
        //        }
        //    }

        //    filter.PageNumber = filter.PageNumber ?? 0;

        //    if(filter.PageSize != null)
        //    {
        //        data = data.Skip((int)filter.PageSize * (int)filter.PageNumber)
        //                   .Take((int)filter.PageSize);
        //    }

        //    return new WebResult<IQueryable<GeoPoint>>()
        //    {
        //        Data = data,
        //        Success = true,
        //        PageNumber = filter.PageNumber,
        //        PageSize = filter.PageSize,
        //        TotalItems = totalItems
        //    };
        //}

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
    }
}
