using System;
using System.Linq;
using GeoPing.Core.Interfaces;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGeopointService : IDataService<GeoPoint>
    {
        WebResult<IQueryable<GeoPoint>> GetByFilter(Guid listId, GeopointFilterDTO filter, out int totalItems);

        OperationResult Delete(string ids);

        bool IsPointExistWithId(string pointId);
        bool IsPointExistWithId(string pointId, Guid listId);
        bool TryGetPointWithId(string pointId, out GeoPoint point);
        bool TryGetPointWithId(string pointId, Guid listId, out GeoPoint point);
    }
}
