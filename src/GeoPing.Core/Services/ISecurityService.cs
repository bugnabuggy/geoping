using System;
using System.Collections.Generic;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface ISecurityService
    {
        IEnumerable<GeoPingUser> GetUsersHaveAccessToWatchList(GeoList list);
        IEnumerable<GeoPingUser> GetUsersHaveAccessToManipulateList(GeoList list);
        bool IsUserHasAccessToWatchList(Guid userId, GeoList list);
        bool IsUserHasAccessToManipulateList(Guid userId, GeoList list);
        string GetSHA256HashString(string value);
    }
}
