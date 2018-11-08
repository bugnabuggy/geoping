using GeoPing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface ISecurityService
    {
        IEnumerable<object> GetUsersHaveAccessToList(GeoList list);
        bool IsUserHasAccessToList(Guid userId, GeoList list);
    }
}
