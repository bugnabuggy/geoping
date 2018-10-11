using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class UserRoles
    {
        public string Admin = "admin";
        public string User = "user";

        public IList<string> ToList()
        {
            return new List<string> { Admin, User };
        }
    }
}
