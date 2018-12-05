using System;
using System.Collections.Generic;
using System.Linq;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface ICheckInStatisticsService
    {
        WebResult<IQueryable<CheckInStatsDTO>> GetStatOfUsersList
            (Guid guid, string listId, CheckInStatFilterDTO filter, out int totalItems);
        OperationResult<IEnumerable<UserAutoCompleteDTO>> GetAllowedUsers(Guid guid, string listId);
    }
}
