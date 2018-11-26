using GeoPing.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface ICheckInService
    {
        OperationResult<CheckIn> GetCheckIn(string pointId, Guid userId);
        OperationResult<IEnumerable<CheckIn>> GetChecksIn(string listId, Guid userId);
        OperationResult<CheckIn> AddCheckIn(CheckIn item);

        bool IsListExistWithThisId(string Id, out GeoList list);
        bool IsPointExistWithThisId(string Id, Guid ListId, out GeoPoint point);
        bool IsPointExistWithThisId(string Id, out GeoPoint point);
    }
}
