using System;
using System.Collections.Generic;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IPublicService
    {
        WebResult<IEnumerable<PublicListDTO>> GetByFilter(PublicGeolistFilterDTO filter);
        WebResult<IEnumerable<PublicListDTO>> GetByFilter(Guid ownerId, PublicGeolistFilterDTO filter);
        PublicListDTO GetPublicList(Guid listId);
        IEnumerable<GeoPoint> GetPointsOfPublicList(Guid listId);
        GeoPoint GetPointOfPublicList(Guid listId, Guid pointId);

        bool DoesPublicListExist(Guid listId);
    }
}
