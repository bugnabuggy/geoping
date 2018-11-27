using System.Collections.Generic;
using GeoPing.Infrastructure.Models;

namespace GeoPing.Api.Configuration.SeededData
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
