using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Geoping.Services
{
    public class CheckInStatisticsService : ICheckInStatisticsService
    {
        private Dictionary<string, Expression<Func<CheckInWithUserNameDTO, object>>> orderBys =
            new Dictionary<string, Expression<Func<CheckInWithUserNameDTO, object>>>()
            {
                {"date", x => x.Date},
                {"userName", x => x.Username}
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

        public WebResult<IQueryable<CheckInWithUserNameDTO>> GetStatOfUsersList
            (Guid userId, string listId, CheckInStatFilterDTO filter, out int totalItems)
        {
            totalItems = 0;

            var isListExist = _listSrv.IsListExistWithThisId(listId, out var list);

            if (!isListExist)
            {
                return new WebResult<IQueryable<CheckInWithUserNameDTO>>()
                {
                    Messages = new[] { $"There is no list with Id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToManipulateList(userId, list))
            {
                return new WebResult<IQueryable<CheckInWithUserNameDTO>>()
                {
                    Messages = new[] { $"You have no rights to manipulate list with Id = [{listId}]" }
                };
            }

            var points = _pointSrv.GetByFilter(list.Id, new GeopointFilterDTO(), out int totalPoints).Data;

            var data = from ch in _checksRepo.Data
                       from gp in points
                       where ch.PointId == gp.Id
                       select new CheckInWithUserNameDTO()
                       {
                           UserId = ch.UserId,
                           Username = _gpUserRepo.Data.FirstOrDefault(x => x.Id == ch.UserId).Login,
                           PointId = ch.PointId,
                           Latitude = ch.Latitude,
                           Longitude = ch.Longitude,
                           Distance = ch.Distance,
                           Date = ch.Date,
                           DeviceId = ch.DeviceId,
                           Ip = ch.Ip,
                           UserAgent = ch.UserAgent
                       };

            data = GetFilteredData(data, filter);

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

            return new WebResult<IQueryable<CheckInWithUserNameDTO>>()
            {
                Data = data,
                Success = true,
                Messages = new[] { $"There are all checks in for points of list with Id = [{listId}]" },
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems,
            };
        }

        private IQueryable<CheckInWithUserNameDTO> GetFilteredData
            (IQueryable<CheckInWithUserNameDTO> data, CheckInStatFilterDTO filter)
        {
            var isDatePeriodFrom = DateTime.TryParse(filter.DatePeriodFrom, out var periodFrom);
            var isDatePeriodTo = DateTime.TryParse(filter.DatePeriodTo, out var periodTo);
            var isUserId = Guid.TryParse(filter.UserId, out var userId);

            data = isDatePeriodFrom
                ? data.Where(x => x.Date >= periodFrom)
                : data;

            data = isDatePeriodTo
                ? data.Where(x => x.Date <= periodTo)
                : data;

            data = isUserId
                ? data.Where(x => x.UserId == userId)
                : data;

            return data;
        }
    }
}
