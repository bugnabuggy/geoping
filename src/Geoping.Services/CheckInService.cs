using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Geoping.Services
{
    public class CheckInService : ICheckInService
    {
        private IGeolistService _geolistSrv;
        private IGeopointService _pointSrv;
        private IRepository<CheckIn> _checkInRepo;

        public CheckInService(IGeolistService geolistSrv,
                              IGeopointService pointSrv)
        {
            _geolistSrv = geolistSrv;
            _pointSrv = pointSrv;
        }

        public OperationResult<CheckIn> GetCheckIn(Guid pointId)
        {
            throw new NotImplementedException();
        }

        public OperationResult<CheckIn> GetChecksIn(Guid listId)
        {
            throw new NotImplementedException();
        }

        public OperationResult<CheckIn> AddCheckIn(CheckIn item)
        {
            return new OperationResult<CheckIn>()
            {
                Data = _checkInRepo.Add(item),
                Messages = new[] { $"User was successfully checked in point with id = [{item.PointId}]" },
                Success = true
            };
        }

        public bool IsListExistWithThisId(string id, out GeoList list)
        {
            var result = _geolistSrv.IsListExistWithThisId(id, out GeoList data);
            list = data;
            return result;
        }

        public bool IsPointExistWithThisId(string id, Guid listId, out GeoPoint point)
        {
            var result = _pointSrv.IsPointExistWithThisId(id, listId, out GeoPoint data);
            point = data;
            return result;
        }

        public bool IsPointExistWithThisId(string Id, out GeoPoint point)
        {
            var isPointId = Guid.TryParse(Id, out Guid pointId);
            point = null;
            if (!isPointId)
            {
                return false;
            }

            point = _pointSrv.Get(x =>x.Id == pointId).FirstOrDefault();
            if (point == null)
            {
                return false;
            }

            return true;
        }
    }
}
