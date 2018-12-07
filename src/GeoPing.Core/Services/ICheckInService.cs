using System;
using System.Collections.Generic;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface ICheckInService
    {
        OperationResult<CheckIn> GetCheckIn(string pointId, Guid userId);
        OperationResult<IEnumerable<CheckIn>> GetChecksIn(string listId, Guid userId);
        OperationResult<CheckIn> AddCheckIn(Guid userId, string pointId, CheckInDTO item);
    }
}
