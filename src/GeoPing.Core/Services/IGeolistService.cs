﻿using GeoPing.Core.Entities;
using GeoPing.Core.Interfaces;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Core.Services
{
    public interface IGeolistService : IDataService<GeoList>
    {
        WebResult<IQueryable<GeoList>> GetByFilter(Guid userId, UsersGeolistFilterDTO filter, out int totalItems);
        WebResult<IQueryable<PublicListDTO>> GetByFilter(PublicGeolistFilterDTO filter, out int totalItems);
        WebResult<IQueryable<PublicListDTO>> GetByFilter(Guid ownerId, PublicGeolistFilterDTO filter, out int totalItems);
    }
}
