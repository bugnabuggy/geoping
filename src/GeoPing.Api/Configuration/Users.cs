using GeoPing.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class Users
    {
        public AppIdentityUser Admin = new AppIdentityUser
        {
            UserName = "testadmin",
            Email = "testadmin@geoping.com",
            EmailConfirmed = true
        };

        public AppIdentityUser User = new AppIdentityUser
        {
            UserName = "testuser",
            Email = "testuser@geoping.com",
            EmailConfirmed = true
        };
        
        public IList<AppIdentityUser> ToList()
        {
            return new List<AppIdentityUser>
            {
                Admin,
                User
            };
        }
    }
}
