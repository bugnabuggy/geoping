using GeoPing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface ISecurityService
    {
        bool IsUserHaveAccessToList(Guid userId, GeoList list);
    }
}
