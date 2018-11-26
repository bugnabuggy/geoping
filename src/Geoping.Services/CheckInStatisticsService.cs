﻿using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using GeoPing.Core.Models.Entities;

namespace Geoping.Services
{
    public class CheckInStatisticsService : ICheckInStatisticsService
    {
        private Dictionary<string, Expression<Func<CheckInStatsDTO, object>>> orderBys =
            new Dictionary<string, Expression<Func<CheckInStatsDTO, object>>>()
            {
                {"pointName", x => x.Point.Name},
                {"date", x => x.Check.Date}
            };

        private IRepository<CheckIn> _checksRepo;
        private IGeolistService _listSrv;
        private IGeopointService _pointSrv;
        private ISecurityService _securitySrv;
        private IRepository<GeoPingUser> _gpUserRepo;

        public CheckInStatisticsService(IRepository<CheckIn> checksRepo,
                                        IGeolistService listSrv,
                                        IGeopointService pointSrv,
                                        ISecurityService securitySrv,
                                        IRepository<GeoPingUser> gpUserRepo)
        {
            _checksRepo = checksRepo;
            _listSrv = listSrv;
            _pointSrv = pointSrv;
            _securitySrv = securitySrv;
            _gpUserRepo = gpUserRepo;
        }

        public WebResult<IQueryable<CheckInStatsDTO>> GetStatOfUsersList
            (Guid userId, string listId, CheckInStatFilterDTO filter, out int totalItems)
        {
            totalItems = 0;

            var isListExist = _listSrv.IsListExistWithThisId(listId, out var list);

            if (!isListExist)
            {
                return new WebResult<IQueryable<CheckInStatsDTO>>()
                {
                    Messages = new[] { $"There is no list with Id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToManipulateList(userId, list))
            {
                return new WebResult<IQueryable<CheckInStatsDTO>>()
                {
                    Messages = new[] { $"You have no rights to manipulate list with Id = [{listId}]" }
                };
            }

            var points = _pointSrv.Get(x => x.ListId == list.Id);

            var checks = GetFilteredData(_checksRepo.Data, filter)
                .OrderByDescending(x => x.Date)
                .GroupBy(x => x.PointId)
                .Select(x => x.FirstOrDefault());

            var data = from p in points
                       join ch in checks on p.Id equals ch.PointId into stat
                       from x in stat.DefaultIfEmpty()
                       select new CheckInStatsDTO()
                       {
                           Point = new CheckInStatPointDTO()
                           {
                               Id = p.Id,
                               Name = p.Name,
                               Description = p.Description,
                               Latitude = p.Latitude,
                               Longitude = p.Longitude,
                               Radius = p.Radius,
                               Address = p.Address,
                           },
                           Check = x != null
                           ? new CheckInStatCheckDTO()
                           {
                               UserId = x.UserId,
                               PointId = x.PointId,
                               Latitude = x.Latitude,
                               Longitude = x.Longitude,
                               Distance = x.Distance,
                               Date = x.Date,
                               Ip = x.Ip,
                               DeviceId = x.DeviceId,
                               UserAgent = x.UserAgent
                           }
                           : new CheckInStatCheckDTO()
                       };
            totalItems = data.Count();

            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && orderBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = orderBys[filter.OrderBy];

                if (filter.IsDesc)
                {
                    data.OrderByDescending(orderExpression);
                }
                else
                {
                    data.OrderBy(orderExpression);
                }
            }

            if (filter.PageSize != null)
            {
                data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            return new WebResult<IQueryable<CheckInStatsDTO>>()
            {
                Data = data,
                Success = true,
                Messages = new[] { $"There are all checks in for points of list with Id = [{listId}]" },
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems,
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
    }
}
