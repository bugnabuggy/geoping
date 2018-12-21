using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
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
        Task<OperationResult<GeoList>> Update(Guid userId, GeoList item);
        Task<OperationResult<GeoList>> Delete(Guid userId, GeoList item);
        Task<OperationResult> Delete(Guid userId, string ids);

        WebResult<IQueryable<GeoList>> GetByFilter(Guid userId, UsersGeolistFilterDTO filter, out int totalItems);

        bool IsListExistWithId(string id);
        bool TryGetListWithId(string id, out GeoList list);
        IQueryable<GeoList> FilterListsByFilter(IQueryable<GeoList> data, GeolistFilterDTO filter);
    }
}
