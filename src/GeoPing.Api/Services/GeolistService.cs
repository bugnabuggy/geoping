using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GeoPing.Api.Services
{
    public class GeolistService : IGeolistService
    {
        private IRepository<GeoList> _rep;

        public GeolistService(IRepository<GeoList> rep)
        {
            _rep = rep;
        }

        public IQueryable<GeoList> Get()
        {
            return _rep.Data;
        }

        public IQueryable<GeoList> Get(Expression<Func<GeoList, bool>> func)
        {
            return _rep.Data.Where(func);
        }

        public OperationResult<GeoList> Add(GeoList item)
        {
            return new OperationResult<GeoList>()
            {
                Data = _rep.Add(item),
                Messages = new[] { "Geolist was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoList> Update(GeoList item)
        {
            return new OperationResult<GeoList>()
            {
                Data = _rep.Update(item),
                Messages = new[] { "Geolist was successfully edited." },
                Success = true
            };
        }

        public OperationResult<GeoList> Delete(GeoList item)
        {
            return new OperationResult<GeoList>()
            {
                Data = _rep.Delete(item),
                Messages = new[] { "Geolist was successfully removed." },
                Success = true
            };
        }
    }
}
