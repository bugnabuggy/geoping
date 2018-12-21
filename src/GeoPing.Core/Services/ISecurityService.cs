using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface ISecurityService
    {
        IEnumerable<GeoPingUser> GetUsersHaveAccessToWatchList(GeoList list);
        Task<IEnumerable<GeoPingUser>> GetUsersHaveAccessToManipulateList(GeoList list);
        bool IsUserHasAccessToWatchList(Guid userId, GeoList list);
        Task<bool> IsUserHasAccessToManipulateList(Guid userId, GeoList list);
        string GetSHA256HashString(string value);
    }
}
