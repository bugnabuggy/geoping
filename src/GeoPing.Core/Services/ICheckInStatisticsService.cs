using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface ICheckInStatisticsService
    {
        WebResult<IQueryable<CheckInWithUserNameDTO>> GetStatOfUsersList
            (Guid guid, string listId, CheckInStatFilterDTO filter, out int totalItems);
    }
}
