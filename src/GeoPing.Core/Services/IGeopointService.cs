using GeoPing.Core.Interfaces;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Linq;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGeopointService : IDataService<GeoPoint>
    {
        WebResult<IQueryable<GeoPoint>> GetByFilter(Guid listId, GeopointFilterDTO filter, out int totalItems);

        OperationResult Delete(string ids);

        bool IsPointExistWithThisId(string id, Guid listId, out GeoPoint point);
    }
}
