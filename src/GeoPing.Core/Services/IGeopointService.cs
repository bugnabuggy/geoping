using GeoPing.Core.Interfaces;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGeopointService : IDataService<GeoPoint>
    {
        WebResult<IQueryable<GeoPoint>> GetByFilter(Guid listId, GeopointFilterDTO filter, out int totalItems);

        OperationResult Delete(string ids);

        bool IsPointExistWithThisId(string Id, Guid ListId, out GeoPoint point);
    }
}
