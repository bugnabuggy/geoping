using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Api.Models;

namespace GeoPing.TestData
{
    class AppUsersList
    {
        internal static ApplicationUser GetIdentityUser()
        {
            return new ApplicationUser()
            {
                UserName = "Tester"
            };
        }

        //public static N2NUser GetNotInDbUser()
        //{
        //    return new N2NUser()
        //    {
        //        Id = Guid.NewGuid(),
        //        NickName = "User",
        //        Registration = DateTime.UtcNow,
        //        Email = "test@test.xcom",
        //        FirstName = "Te",
        //        LastName = "St",
        //        PhoneNumber = "+123456789"
        //    };
        //}

        public static IEnumerable<ApplicationUser> GetList()
        {
            return new List<ApplicationUser>()
            {
                new ApplicationUser()
                {
                    UserName = "Tester1",
                    Email = "test1@test.com",
                    FullName = "Test, the 1st",
                    PhoneNumber = "+1234567891"
                },
                new ApplicationUser()
                {
                    UserName = "Tester2",
                    Email = "test2@test.com",
                    FullName = "Test, the 2nd",
                    PhoneNumber = "+1234567892"
                },
                new ApplicationUser()
                {
                    UserName = "Tester3",
                    Email = "test3@test.com",
                    FullName = "Test, the 3rd",
                    PhoneNumber = "+1234567893"
                }
            };
        }
    }
}
