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
            var isPointExist = _pointSrv.IsPointExistWithId(pointId);

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
                .FirstOrDefault(x => x.PointId == Guid.Parse(pointId) && x.UserId == userId);

            if (result == null)
            {
                return new OperationResult<CheckIn>
                {
                    Messages = new[] { $"User didn`t check in point with Id = [{pointId}]" }
                };
            }

            return new OperationResult<CheckIn>
            {
                Data = result,
                Messages = new[] { $"User checked in point with Id = [{pointId}]" },
                Success = true
            };
        }

        public OperationResult<IEnumerable<CheckIn>> GetChecksIn(string listId, Guid userId)
        {
            var isListExist = _geolistSrv.IsListExistWithId(listId);

            if (!isListExist)
            {
                return new OperationResult<IEnumerable<CheckIn>>
                {
                    Messages = new[] { $"There is no list with Id = [{listId}]" }
                };
            }

            var points = _pointSrv.Get(x => x.ListId == Guid.Parse(listId));

            var data = from ch in _checkInRepo.Get()
                       from p in points
                       where ch.PointId == p.Id && ch.UserId == userId
                       select ch;

            return new OperationResult<IEnumerable<CheckIn>>
            {
                Data = data,
                Messages = new[] { $"User checked in following points of list with Id = [{listId}]" },
                Success = true
            };
        }

        public OperationResult<CheckIn> AddCheckIn(Guid userId, string pointId, CheckInDTO item)
        {
            CheckIn checkIn;

            if (pointId != null)
            {
                if (!_pointSrv.TryGetPointWithId(pointId, out var point))
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
    }
}
