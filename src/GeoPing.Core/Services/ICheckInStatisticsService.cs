using System;
using System.Collections.Generic;
using System.Linq;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface ICheckInStatisticsService
    {
        WebResult<IQueryable<CheckInStatsDTO>> GetStatOfUsersLists
            (Guid ownerId, CheckInStatFilterDTO filter, out int totalItems);
        WebResult<IQueryable<CheckInStatsDTO>> GetStatOfUsersList
            (Guid ownerId, string listId, CheckInStatFilterDTO filter, out int totalItems);
        OperationResult<IEnumerable<UserAutoCompleteDTO>> GetAllowedUsers(Guid guid, string listId);
    }
}
