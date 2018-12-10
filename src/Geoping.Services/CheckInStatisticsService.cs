using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;

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

        public CheckInStatisticsService
            (IRepository<CheckIn> checksRepo,
            IGeolistService listSrv,
            IGeopointService pointSrv,
            ISecurityService securitySrv)
        {
            _checksRepo = checksRepo;
            _listSrv = listSrv;
            _pointSrv = pointSrv;
            _securitySrv = securitySrv;
        }

        public WebResult<IEnumerable<CheckInStatsDTO>> GetStatOfLists
            (Guid ownerId, CheckInStatFilterDTO filter, out int totalItems)
        {
            _listSrv.GetAllowedLists(ownerId);

            var points = _pointSrv.Get(p => _listSrv.GetAllowedLists(ownerId).Any(l => p.ListId == l.Id));

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
            totalItems = 0;

            var isListExist = _listSrv.TryGetListWithId(listId, out var list);

            if (!isListExist)
            {
                return new WebResult<IEnumerable<CheckInStatsDTO>>
                {
                    Messages = new[] { $"There is no list with Id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToManipulateList(userId, list))
            {
                return new WebResult<IEnumerable<CheckInStatsDTO>>
                {
                    Messages = new[] { $"You have no rights to manipulate list with Id = [{listId}]", "Unauthorized" }
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
            var checks = GetFilteredData(_checksRepo.Get(x => x.UserId == userId && x.PointId == null), filter)
                .OrderByDescending(x => x.Date);

            var data =
                from ch in checks
                select new CheckInStatsDTO
                {
                    Address = ch.Description,
                    CheckInDate = ch.Date,
                    Distance = ch.Distance,
                    Latitude = ch.Latitude,
                    Longitude = ch.Longitude,
                    Type = CheckInType.FreeCheck,
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
            var checksIn = GetFilteredData(_checksRepo.Get(x => x.UserId == userId)
                .OrderByDescending(x => x.Date), filter);

            var data =
                from ch in checksIn
                join p in _pointSrv.Get() on ch.PointId equals p.Id
                    into history
                from h in history.DefaultIfEmpty()
                join l in _listSrv.Get() on h.ListId equals l.Id
                select new CheckInHistoryDTO
                {
                    CheckInDate = ch.Date,
                    LatLng = $"{ch.Latitude}/{ch.Longitude}",
                    ListName = h != null ? l.Name : null,
                    Info = h != null ? h.Address : ch.Description
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
            var isListExists = _listSrv.TryGetListWithId(listId, out var list);

            if (list == null)
            {
                return new OperationResult<IEnumerable<UserAutoCompleteDTO>>
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToWatchList(userId, list))
            {
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
                           Radius = p.Radius,
                           CheckInDate = x != null ? (DateTime?)x.Date : null,
                           Distance = x != null ? x.Distance : null,
                           Latitude = x != null ? (double?)x.Latitude : null,
                           Longitude = x != null ? (double?)x.Longitude : null,
                           Type = x != null ? CheckInType.CheckedPoint : CheckInType.UncheckedPoint,
                           UserId = x != null ? (Guid?)x.UserId : null,
                       };

            return data;
        }
    }
}
