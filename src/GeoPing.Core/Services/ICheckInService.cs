using System;
using System.Collections.Generic;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface ICheckInService
    {
        OperationResult<CheckIn> GetCheckIn(Guid userId, string pointId);
        OperationResult<IEnumerable<CheckIn>> GetChecksIn(Guid userId, string listId);
        OperationResult<CheckIn> AddCheckIn(Guid userId, string pointId, CheckInDTO item);
    }
}
