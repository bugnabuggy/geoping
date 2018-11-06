using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface ICheckInStatisticsService
    {
        WebResult<CheckInStatDTO> GetStatOfUsersList(string listId, CheckInStatFilterDTO filter);
    }
}
