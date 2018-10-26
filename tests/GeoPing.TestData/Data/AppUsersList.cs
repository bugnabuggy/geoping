using GeoPing.Core.Models;
using GeoPing.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.TestData.Data
{
    class AppUsersList
    {
        internal static AppIdentityUser GetIdentityUser()
        {
            return new AppIdentityUser()
            {
                UserName = "Tester"
            };
        }

        public static IEnumerable<AppIdentityUser> GetList()
        {
            return new List<AppIdentityUser>()
            {
                new AppIdentityUser()
                {
                    UserName = "Tester1",
                    Email = "test1@test.com",
                    PhoneNumber = "+1234567891",
                    EmailConfirmed = true
                },
                new AppIdentityUser()
                {
                    UserName = "Tester2",
                    Email = "test2@test.com",
                    PhoneNumber = "+1234567892",
                    EmailConfirmed = true
                },
                new AppIdentityUser()
                {
                    UserName = "Tester3",
                    Email = "test3@test.com",
                    PhoneNumber = "+1234567893",
                    EmailConfirmed = true
                }
            };
        }
    }
}
