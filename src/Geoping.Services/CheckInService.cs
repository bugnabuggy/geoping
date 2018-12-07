using System;
using System.Collections.Generic;
using System.Linq;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;

namespace GeoPing.Services
{
    public class CheckInService : ICheckInService
    {
        private IGeolistService _geolistSrv;
        private IGeopointService _pointSrv;
        private ISecurityService _securitySrv;
        private IRepository<CheckIn> _checkInRepo;

        public CheckInService
            (IGeolistService geolistSrv,
            IGeopointService pointSrv,
            IRepository<CheckIn> checkInRepo,
            ISecurityService securitySrv)
        {
            _geolistSrv = geolistSrv;
            _pointSrv = pointSrv;
            _checkInRepo = checkInRepo;
            _securitySrv = securitySrv;
        }

        public OperationResult<CheckIn> GetCheckIn(string pointId, Guid userId)
        {
            var isPointExist = IsPointExistWithThisId(pointId, out var point);

            if (!isPointExist)
            {
                return new OperationResult<CheckIn>
                {
                    Messages = new[] { $"There is no point with Id = [{pointId}]" }
                };
            }

            var result = _checkInRepo
                .Get()
                .OrderByDescending(x => x.Date)
                .FirstOrDefault(x => x.PointId == point.Id && x.UserId == userId);

            if (result == null)
            {
                return new OperationResult<CheckIn>
                {
                    Messages = new[] { $"User didn`t check in point with Id = [{point.Id}]" }
                };
            }

            return new OperationResult<CheckIn>
            {
                Data = result,
                Messages = new[] { $"User checked in point with Id = [{point.Id}]" },
                Success = true
            };
        }

        public OperationResult<IEnumerable<CheckIn>> GetChecksIn(string listId, Guid userId)
        {
            var isListExist = IsListExistWithThisId(listId, out var list);

            if (!isListExist)
            {
                return new OperationResult<IEnumerable<CheckIn>>
                {
                    Messages = new[] { $"There is no list with Id = [{listId}]" }
                };
            }

            var points = _pointSrv.Get(x => x.ListId == list.Id);

            var data = from ch in _checkInRepo.Get()
                       from p in points
                       where ch.PointId == p.Id && ch.UserId == userId
                       select ch;

            return new OperationResult<IEnumerable<CheckIn>>
            {
                Data = data,
                Messages = new[] { $"User checked in following points of list with Id = [{list.Id}]" },
                Success = true
            };
        }

        public OperationResult<CheckIn> AddCheckIn(Guid userId, string pointId, CheckInDTO item)
        {
            CheckIn checkIn;

            if (pointId != null)
            {
                if (!IsPointExistWithThisId(pointId, out GeoPoint point))
                {
                    return new OperationResult<CheckIn>()
                    {
                        Messages = new[] { "There is no point with Id = [{pointId}]." }
                    };
                }

                if (!_securitySrv.IsUserHasAccessToWatchList
                    (userId, _geolistSrv.Get().FirstOrDefault(x => x.Id == point.ListId)))
                {
                    return new OperationResult<CheckIn>()
                    {
                        Messages = new[] { "Unauthorized" }
                    };
                }
            }

            checkIn = new CheckIn
            {
                Distance = item.Distance,
                Latitude = item.Latitude,
                Longitude = item.Longitude,
                Ip = item.Ip,
                DeviceId = item.DeviceId,
                UserAgent = item.UserAgent,
                Date = DateTime.UtcNow,
                UserId = userId,
                PointId = pointId != null
                    ? (Guid?)Guid.Parse(pointId)
                    : null
            };

            return new OperationResult<CheckIn>
            {
                Data = _checkInRepo.Add(checkIn),
                Messages = new[] { $"User was successfully checked in point with id = [{pointId}]" },
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

        public bool IsPointExistWithThisId(string id, out GeoPoint point)
        {
            var isPointId = Guid.TryParse(id, out Guid pointId);
            point = null;
            if (!isPointId)
            {
                return false;
            }

            point = _pointSrv.Get().FirstOrDefault(x => x.Id == pointId);
            if (point == null)
            {
                return false;
            }

            return true;
        }
    }
}
