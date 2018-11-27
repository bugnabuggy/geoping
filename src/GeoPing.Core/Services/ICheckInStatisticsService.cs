using System;
using System.Linq;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface ICheckInStatisticsService
    {
        WebResult<IQueryable<CheckInStatsDTO>> GetStatOfUsersList
            (Guid guid, string listId, CheckInStatFilterDTO filter, out int totalItems);
    }
}
