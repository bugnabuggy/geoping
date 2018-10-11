using GeoPing.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class Users
    {
        public ApplicationUser Admin = new ApplicationUser
        {
            UserName = "testadmin",
            Email = "testadmin@geoping.com"
        };

        public ApplicationUser User = new ApplicationUser
        {
            UserName = "testuser",
            Email = "testuser@geoping.com"
        };
        
        public IList<ApplicationUser> ToList()
        {
            return new List<ApplicationUser>
            {
                Admin,
                User
            };
        }
    }
}
