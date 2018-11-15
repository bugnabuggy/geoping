using GeoPing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface ISecurityService
    {
        IEnumerable<object> GetUsersHaveAccessToList(GeoList list);
        bool IsUserHasAccessToWatchList(Guid userId, GeoList list);
        bool IsUserHasAccessToManipulateList(Guid userId, GeoList list);
    }
}
