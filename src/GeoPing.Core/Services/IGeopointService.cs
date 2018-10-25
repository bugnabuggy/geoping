using GeoPing.Core.Entities;
using GeoPing.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Core.Services
{
    public interface IGeopointService : IDataService<GeoPoint>
    {
        //WebResult<IQueryable<GeoPoint>> GetByFilter(string listId, GeopointFilterDTO filter, out int totalItems);

        //OperationResult CheckPoint(GeoPoint point, string userId);
    }
}
