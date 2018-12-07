using System;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGeolistService
    {
        IQueryable<GeoList> Get();
        IQueryable<GeoList> Get(Expression<Func<GeoList, bool>> func);
        IQueryable<GeoList> GetAllowedLists(Guid userId);

        OperationResult<GeoList> Add(GeoList item);
        OperationResult<GeoList> Update(Guid userId, GeoList item);
        OperationResult<GeoList> Delete(Guid userId, GeoList item);
        OperationResult Delete(Guid userId, string ids);

        WebResult<IQueryable<GeoList>> GetByFilter(Guid userId, UsersGeolistFilterDTO filter, out int totalItems);
        WebResult<IQueryable<PublicListDTO>> GetByFilter(PublicGeolistFilterDTO filter, out int totalItems);
        WebResult<IQueryable<PublicListDTO>> GetByFilter(Guid ownerId, PublicGeolistFilterDTO filter, out int totalItems);

        bool IsListExistWithId(string id);
        bool TryGetListWithId(string id, out GeoList list);
    }
}
