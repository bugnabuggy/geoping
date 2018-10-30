using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Geoping.Services
{
    public class SecurityService : ISecurityService
    {
        public SecurityService()
        {
           
        }

        public bool IsUserHaveAccessToList(Guid userId, GeoList list)
        {
            if (list.OwnerId == userId)
            {
                return true;
            }
            return false;
        }
    }
}
