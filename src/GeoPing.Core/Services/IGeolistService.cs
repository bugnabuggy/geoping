using GeoPing.Core.Entities;
using GeoPing.Core.Interfaces;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GeoPing.Core.Services
{
    public interface IGeolistService
    {
        IQueryable<GeoList> Get();
        IQueryable<GeoList> Get(Expression<Func<GeoList, bool>> func);

        OperationResult<GeoList> Add(GeoList item);
        OperationResult<GeoList> Update(Guid userId, GeoList item);
        OperationResult<GeoList> Delete(Guid userId, GeoList item);
        OperationResult Delete(Guid userId, string Ids);

        WebResult<IQueryable<GeoList>> GetByFilter(Guid userId, UsersGeolistFilterDTO filter, out int totalItems);
        WebResult<IQueryable<PublicListDTO>> GetByFilter(PublicGeolistFilterDTO filter, out int totalItems);
        WebResult<IQueryable<PublicListDTO>> GetByFilter(Guid ownerId, PublicGeolistFilterDTO filter, out int totalItems);

        bool IsListExistWithThisId(string Id, out GeoList list);
    }
}
