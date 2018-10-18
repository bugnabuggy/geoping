using GeoPing.Api.Models;
using GeoPing.Api.Models.DTO;
using GeoPing.Api.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Interfaces
{
    public interface IGeopointService : IDataService<GeoPoint>
    {
        WebResult<IQueryable<GeoPoint>> GetByFilter(string listId, GeopointFilterDTO filter, out int totalItems);

        OperationResult CheckPoint(GeoPoint point, string userId);
    }
}
