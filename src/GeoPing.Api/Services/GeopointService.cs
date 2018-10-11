using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace GeoPing.Api.Services
{
    public class GeopointService : IGeopointService
    {
        private IRepository<GeoPoint> _pointRep;
        private IRepository<UserPoint> _upRep;
        private UserManager<ApplicationUser> _userManager;

        public GeopointService(IRepository<GeoPoint> pointRep,
                               IRepository<UserPoint> upRep,
                               UserManager<ApplicationUser> userManager)
        {
            _pointRep = pointRep;
            _upRep = upRep;
            _userManager = userManager;
        }

        public IQueryable<GeoPoint> Get()
        {
            return _pointRep.Data;
        }

        public IQueryable<GeoPoint> Get(Expression<Func<GeoPoint, bool>> func)
        {
            return _pointRep.Data.Where(func);
        }

        public OperationResult<GeoPoint> Add(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _pointRep.Add(item),
                Messages = new[] { "Geopoint was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Update(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _pointRep.Update(item),
                Messages = new[] { "Geopoint was successfully edited." },
                Success = true
            };
        }

        public OperationResult<GeoPoint> Delete(GeoPoint item)
        {
            return new OperationResult<GeoPoint>()
            {
                Data = _pointRep.Delete(item),
                Messages = new[] { "Geopoint was successfully removed." },
                Success = true
            };
        }

        public OperationResult CheckPoint(GeoPoint point, string userId)
        {
            var result = _upRep.Add(new UserPoint
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
