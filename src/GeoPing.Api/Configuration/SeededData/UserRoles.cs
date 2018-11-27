using System.Collections.Generic;

namespace GeoPing.Api.Configuration.SeededData
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
