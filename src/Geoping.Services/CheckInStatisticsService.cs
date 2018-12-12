using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Models.Enums;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Logging;

namespace GeoPing.Services
{
    public class CheckInStatisticsService : ICheckInStatisticsService
    {
        private Dictionary<string, Expression<Func<CheckInStatsDTO, object>>> _orderStatBys =
            new Dictionary<string, Expression<Func<CheckInStatsDTO, object>>>
            {
                {"pointName", x => x.Name},
                {"date", x => x.CheckInDate}
            };

        private Dictionary<string, Expression<Func<CheckInHistoryDTO, object>>> _orderHistoryBys =
            new Dictionary<string, Expression<Func<CheckInHistoryDTO, object>>>
            {
                {"listName", x => x.ListName},
                {"date", x => x.CheckInDate}
            };

        private IRepository<CheckIn> _checksRepo;
        private IGeolistService _listSrv;
        private IGeopointService _pointSrv;
        private ISecurityService _securitySrv;
        private ILogger<CheckInStatisticsService> _logger;

        public CheckInStatisticsService
            (IRepository<CheckIn> checksRepo,
            IGeolistService listSrv,
            IGeopointService pointSrv,
            ISecurityService securitySrv,
            ILogger<CheckInStatisticsService> logger)
        {
            _checksRepo = checksRepo;
            _listSrv = listSrv;
            _pointSrv = pointSrv;
            _securitySrv = securitySrv;
            _logger = logger;
        }

        public WebResult<IEnumerable<CheckInStatsDTO>> GetStatOfLists
            (Guid ownerId, CheckInStatFilterDTO filter, out int totalItems)
        {
            _logger.LogInformation($"User with Id = [{ownerId}] requested statistics for his owned lists");

            var lists = _listSrv.Get(l => l.OwnerId == ownerId);

            var points = _pointSrv.Get(p => lists.Any(l => p.ListId == l.Id));

            var checks = GetFilteredData(_checksRepo.Get(), filter)
                .OrderByDescending(x => x.Date)
                .GroupBy(x => x.PointId)
                .Select(x => x.FirstOrDefault());

            var data = GetCheckInStat(points, checks);

            totalItems = data.Count();

            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && _orderStatBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = _orderStatBys[filter.OrderBy];

                data = filter.IsDesc
                    ? data.OrderByDescending(orderExpression)
                    : data.OrderBy(orderExpression);
            }

            if (filter.PageSize != null)
            {
                data = data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                           .Take((int)filter.PageSize);
            }

            _logger.LogInformation($"Statistics request for owned lists by user with Id = [{ownerId}] was successful");

            return new WebResult<IEnumerable<CheckInStatsDTO>>
            {
                Data = data,
                Success = true,
                Messages = new[] { $"There are all checks in for points of lists are accessible" },
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public WebResult<IEnumerable<CheckInStatsDTO>> GetStatOfList
            (Guid userId, string listId, CheckInStatFilterDTO filter, out int totalItems)
        {
            _logger.LogInformation($"User with Id = [{userId}] requested statistics for list with Id = [{listId}]");

            totalItems = 0;

            var isListExist = _listSrv.TryGetListWithId(listId, out var list);

            if (!isListExist)
            {
                _logger.LogDebug($"Statistics request for list with Id = [{listId}] " +
                                 $"by user with Id = [{userId}] was failed: list doesn`t exist");

                return new WebResult<IEnumerable<CheckInStatsDTO>>
                {
                    Messages = new[] { $"There is no list with Id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToManipulateList(userId, list))
            {
                _logger.LogDebug($"Statistics request for list with Id = [{listId}] " +
                                 $"by user with Id = [{userId}] was failed: user has no rights to do this action.");

                return new WebResult<IEnumerable<CheckInStatsDTO>>
                {
                    Messages = new[] { "Unauthorized" }
                };
            }

            var points = _pointSrv.Get(x => x.ListId == list.Id);

            var checks = GetFilteredData(_checksRepo.Get(), filter)
                .OrderByDescending(x => x.Date)
                .GroupBy(x => x.PointId)
                .Select(x => x.FirstOrDefault());

            var data = GetCheckInStat(points, checks);

            totalItems = data.Count();

            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && _orderStatBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = _orderStatBys[filter.OrderBy];

                data = filter.IsDesc
                    ? data.OrderByDescending(orderExpression)
                    : data.OrderBy(orderExpression);
            }

            if (filter.PageSize != null)
            {
                data = data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                           .Take((int)filter.PageSize);
            }

            _logger.LogInformation($"Statistics request for list with Id = [{listId}] " +
                                   $"by user with Id = [{userId}] was successful");

            return new WebResult<IEnumerable<CheckInStatsDTO>>
            {
                Data = data,
                Success = true,
                Messages = new[] { $"There are all checks in for points of list with Id = [{listId}]" },
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public WebResult<IEnumerable<CheckInStatsDTO>> GetFreeChecksInStat
            (Guid userId, CheckInStatFilterDTO filter, out int totalItems)
        {
            _logger.LogInformation($"User with Id = [{userId}] requested statistics for his free checks-in");

            var checks = GetFilteredData(_checksRepo.Get(x => x.UserId == userId && x.PointId == null), filter)
                .OrderByDescending(x => x.Date);

            var data =
                from ch in checks
                select new CheckInStatsDTO
                {
                    CheckInId = ch.Id,
                    Address = ch.Description,
                    CheckInDate = ch.Date,
                    Distance = ch.Distance,
                    Latitude = ch.Latitude,
                    Longitude = ch.Longitude,
                    Type = CheckInType.FreeCheck.ToString(),
                    UserId = userId
                };

            totalItems = data.Count();

            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && _orderStatBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = _orderStatBys[filter.OrderBy];

                data = filter.IsDesc
                    ? data.OrderByDescending(orderExpression)
                    : data.OrderBy(orderExpression);
            }

            if (filter.PageSize != null)
            {
                data = data
                    .Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            _logger.LogInformation($"Statistics request for free checks-in by user with Id = [{userId}] was successful");

            return new WebResult<IEnumerable<CheckInStatsDTO>>
            {
                Data = data,
                Success = true,
                Messages = new[] { $"There are all free checks-in for user Id = [{userId}]" },
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public WebResult<IEnumerable<CheckInHistoryDTO>> GetChecksInHistory
            (Guid userId, CheckInHistoryFilterDTO filter)
        {
            _logger.LogInformation($"User with Id = [{userId}] requested history for his checks-in");

            var checksIn = GetFilteredData(_checksRepo.Get(x => x.UserId == userId)
                .OrderByDescending(x => x.Date), filter);

            var data =
                from ch in checksIn
                join p in _pointSrv.Get() on ch.PointId equals p.Id
                into history
                from h in history.DefaultIfEmpty(new GeoPoint() { Geolist = new GeoList() })
                select new CheckInHistoryDTO
                {
                    CheckInDate = ch.Date,
                    LatLng = $"{ch.Latitude} / {ch.Longitude}",
                    ListName = h.Geolist.Name ?? "-Free check-",
                    Info = h.Address ?? ch.Description
                };

            var totalItems = data.Count();

            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && _orderStatBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = _orderHistoryBys[filter.OrderBy];

                data = filter.IsDesc
                    ? data.OrderByDescending(orderExpression)
                    : data.OrderBy(orderExpression);
            }

            if (filter.PageSize != null)
            {
                data = data
                    .Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            _logger.LogInformation($"Statistics request for checks-in history by user with Id = [{userId}] was successful.");

            return new WebResult<IEnumerable<CheckInHistoryDTO>>
            {
                Data = data,
                Success = true,
                Messages = new[] { $"There is checks-in history for user Id = [{userId}]" },
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public OperationResult<IEnumerable<UserAutoCompleteDTO>> GetAllowedUsers(Guid userId, string listId)
        {
            _logger.LogInformation($"User with Id = [{userId}] requested list of users allowed to watch " +
                                   $"list with Id = [{listId}]");

            if (!_listSrv.TryGetListWithId(listId, out var list))
            {
                _logger.LogDebug($"Request for list of users allowed to watch list with Id = [{listId}] " +
                                 $"by user with Id = [{userId}] was failed: list doesn`t exist");

                return new OperationResult<IEnumerable<UserAutoCompleteDTO>>
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToWatchList(userId, list))
            {
                _logger.LogDebug($"Request for list of users allowed to watch list with Id = [{listId}] " +
                                 $"by user with Id = [{userId}] was failed: user has no rights to do this action.");

                return new OperationResult<IEnumerable<UserAutoCompleteDTO>>
                {
                    Messages = new[] { "Unauthorized" }
                };
            }

            var users = _securitySrv.GetUsersHaveAccessToWatchList(list);

            var result = users
                .Select(x => new UserAutoCompleteDTO()
                {
                    UserId = x.Id,
                    FullName = x.LastName != null || x.FirstName != null
                        ? $"{x.LastName} {x.FirstName}".Trim()
                        : "",
                    UserName = x.Login,
                    Email = x.Email
                });

            _logger.LogInformation($"Request for list of users are allowed to watch geolist by user with Id = [{userId}] was successful.");

            return new OperationResult<IEnumerable<UserAutoCompleteDTO>>
            {
                Success = true,
                Messages = new[] { $"Following users may check in points of list with ID = [{listId}]" },
                Data = result
            };
        }

        private IQueryable<CheckIn> GetFilteredData
            (IQueryable<CheckIn> data, CheckInStatFilterDTO filter)
        {
            var isUserId = Guid.TryParse(filter.UserId, out var userId);

            data = isUserId
                ? data.Where(x => x.UserId == userId)
                : data;

            var isDatePeriodFrom = DateTime.TryParse(filter.DatePeriodFrom, out var periodFrom);
            var isDatePeriodTo = DateTime.TryParse(filter.DatePeriodTo, out var periodTo);

            data = isDatePeriodFrom
                ? data.Where(x => x.Date >= periodFrom)
                : data;

            data = isDatePeriodTo
                ? data.Where(x => x.Date <= periodTo)
                : data;

            return data;
        }

        private IQueryable<CheckIn> GetFilteredData
            (IQueryable<CheckIn> data, CheckInHistoryFilterDTO filter)
        {
            var isDatePeriodFrom = DateTime.TryParse(filter.DatePeriodFrom, out var periodFrom);
            var isDatePeriodTo = DateTime.TryParse(filter.DatePeriodTo, out var periodTo);

            data = isDatePeriodFrom
                ? data.Where(x => x.Date >= periodFrom)
                : data;

            data = isDatePeriodTo
                ? data.Where(x => x.Date <= periodTo)
                : data;

            return data;
        }

        private IQueryable<CheckInStatsDTO> GetCheckInStat(IQueryable<GeoPoint> points, IQueryable<CheckIn> checks)
        {
            var data = from p in points
                       join ch in checks on p.Id equals ch.PointId into stat
                       from x in stat.DefaultIfEmpty()
                       select new CheckInStatsDTO
                       {
                           Address = p.Address,
                           Name = p.Name,
                           PointId = p.Id,
                           Latitude = p.Latitude,
                           Longitude = p.Longitude,
                           Radius = p.Radius,
                           CheckInId = x != null ? (Guid?)x.Id : null,
                           CheckInDate = x != null ? (DateTime?)x.Date : null,
                           Distance = x != null ? x.Distance : null,
                           Type = x != null ? CheckInType.Checked.ToString() : CheckInType.Unchecked.ToString(),
                           UserId = x != null ? (Guid?)x.UserId : null,
                       };

            return data;
        }
    }
}
