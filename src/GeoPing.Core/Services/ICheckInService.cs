using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface ICheckInService
    {
        OperationResult<CheckIn> GetCheckIn(Guid pointId);
        OperationResult<CheckIn> GetChecksIn(Guid listId);
        OperationResult<CheckIn> AddCheckIn(CheckIn item);

        bool IsListExistWithThisId(string Id, out GeoList list);
        bool IsPointExistWithThisId(string Id, Guid ListId, out GeoPoint point);
        bool IsPointExistWithThisId(string Id, out GeoPoint point);
    }
}
