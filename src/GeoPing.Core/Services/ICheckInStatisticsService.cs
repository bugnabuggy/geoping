using System;
using System.Collections.Generic;
using System.Linq;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface ICheckInStatisticsService
    {
        WebResult<IEnumerable<CheckInStatsDTO>> GetStatOfLists
            (Guid ownerId, CheckInStatFilterDTO filter, out int totalItems);
        WebResult<IEnumerable<CheckInStatsDTO>> GetStatOfList
            (Guid ownerId, string listId, CheckInStatFilterDTO filter, out int totalItems);
        WebResult<IEnumerable<CheckInStatsDTO>> GetFreeChecksInStat
            (Guid userId, CheckInStatFilterDTO filter, out int totalItems);
        WebResult<IEnumerable<CheckInHistoryDTO>> GetChecksInHistory
            (Guid userId, CheckInHistoryFilterDTO filter);
        OperationResult<IEnumerable<UserAutoCompleteDTO>> GetAllowedUsers(Guid guid, string listId);
    }
}
