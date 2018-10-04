using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.Entities;

namespace GeoPing.Api.Services
{
    public class GeopointService : IGeopointService
    {
        private IRepository<GeoPoint> _rep;

        public GeopointService(IRepository<GeoPoint> rep)
        {
            _rep = rep;
        }

        public IQueryable<GeoPoint> Get()
        {
            return _rep.Data;
        }

        public IQueryable<GeoPoint> Get(Expression<Func<GeoPoint, bool>> func)
        {
            return _rep.Data.Where(func);
        }

        public OperationResult<GeoPoint> Add(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _rep.Add(item),
                Messages = new[] { "Geopoint was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Update(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _rep.Update(item),
                Messages = new[] { "Geopoint was successfully edited." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Delete(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _rep.Delete(item),
                Messages = new[] { "Geopoint was successfully removed." },
                Success = true
            };
        }
    }
}
