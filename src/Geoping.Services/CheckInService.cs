using System;
using System.Collections.Generic;
using System.Linq;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Logging;

namespace GeoPing.Services
{
    public class CheckInService : ICheckInService
    {
        private IGeolistService _geolistSrv;
        private IGeopointService _pointSrv;
        private ISecurityService _securitySrv;
        private IRepository<CheckIn> _checkInRepo;
        private ILogger<CheckInService> _logger;

        public CheckInService
            (IGeolistService geolistSrv,
            IGeopointService pointSrv,
            IRepository<CheckIn> checkInRepo,
            ISecurityService securitySrv,
            ILogger<CheckInService> logger)
        {
            _geolistSrv = geolistSrv;
            _pointSrv = pointSrv;
            _checkInRepo = checkInRepo;
            _securitySrv = securitySrv;
            _logger = logger;
        }

        public OperationResult<CheckIn> GetCheckIn(string pointId, Guid userId)
        {
            _logger.LogInformation($"User with Id = [{userId}] requested CheckIn for point with Id = [{pointId}]");

            var isPointExist = IsPointExistWithThisId(pointId, out var point);

            if (!isPointExist)
            {
                _logger.LogWarning($"CheckIn Request for point with Id = [{pointId}]" +
                                       $" by user with Id = [{userId}] " +
                                       $"failed because there is no point with given id.");

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
                _logger.LogWarning($"CheckIn Request for point with Id = [{pointId}]" +
                                   $" by user with Id = [{userId}] " +
                                   $"failed because there is no CheckIn.");

                return new OperationResult<CheckIn>
                {
                    Messages = new[] { $"User didn`t check in point with Id = [{point.Id}]" }
                };
            }

            _logger.LogInformation($"CheckIn for point with Id = [{pointId}]" +
                                   $" of user with Id = [{userId}] has been requested successfully.");

            return new OperationResult<CheckIn>
            {
                Data = result,
                Messages = new[] { $"User checked in point with Id = [{point.Id}]" },
                Success = true
            };
        }

        public OperationResult<IEnumerable<CheckIn>> GetChecksIn(Guid userId, string listId)
        {
            _logger.LogInformation($"User with Id = [{userId}] requested ChecksIn for list with Id = [{listId}]");

            var isListExist = IsListExistWithThisId(listId, out var list);
            
            if (!isListExist)
            {
                _logger.LogWarning($"CheckIn Request for point with Id = [{listId}]" +
                                   $" by user with Id = [{userId}] " +
                                   $"failed because there is no list with given id.");

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

            _logger.LogInformation($"ChecksIn for list with Id = [{listId}]" +
                                   $" of user with Id = [{userId}] has been requested successfully.");

            return new OperationResult<IEnumerable<CheckIn>>
            {
                Data = data,
                Messages = new[] { $"User checked in following points of list with Id = [{list.Id}]" },
                Success = true
            };
        }

        public OperationResult<CheckIn> AddCheckIn(Guid userId, string pointId, CheckInDTO item)
        {
            _logger.LogInformation($"User with Id = [{userId}] requested to add ChecksIn for point with Id = [{pointId}]");

            CheckIn checkIn;

            if (pointId != null)
            {
                if (!IsPointExistWithThisId(pointId, out GeoPoint point))
                {
                    _logger.LogWarning($"CheckIn Request for point with Id = [{pointId}]" +
                                       $" by user with Id = [{userId}] " +
                                       $"failed because there is no point with given id.");

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

            _logger.LogInformation($"CheckIn for point with Id = [{pointId}]" +
                                   $" of user with Id = [{userId}] has been added successfully.");

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
