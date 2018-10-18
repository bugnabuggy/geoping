using GeoPing.Api.Models;
using GeoPing.Api.Models.DTO;
using GeoPing.Api.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Interfaces
{
    public interface IGeolistService : IDataService<GeoList>
    {
        WebResult<IQueryable<GeoList>> GetByFilter(GeolistFilterDTO filter, out int totalItems);
    }
}
