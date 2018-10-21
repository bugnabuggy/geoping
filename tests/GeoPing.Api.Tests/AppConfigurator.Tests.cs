using GeoPing.Api.Configuration;
using GeoPing.Core.Models;
using GeoPing.Infrastructure.Models;
using GeoPing.TestData.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoPing.Api.Tests
{
    [TestFixture]
    class AppConfiguratorTests
    {
        [Test]
        public void Should_init_testusers_and_roles()
        {
            var appConfigurator = new AppConfigurator();
            var services = new DataBaseDiBootstrapperInMemory().GetServiceProvider();

            appConfigurator.Initialize(services);

            var userManager = services.GetRequiredService<UserManager<AppIdentityUser>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var appUserRoles = new UserRoles();
            var appUsers = new Users();

            foreach(var role in appUserRoles.ToList())
            {
                Assert.IsTrue(roleManager.Roles.Any(r => r.Name.Equals(role)));
            }

            foreach (var appUser in appUsers.ToList())
            {
                Assert.IsTrue(userManager.Users.Any(u => u.Email.Equals(appUser.Email)));
                Assert.IsTrue(userManager.Users.Any(u => u.UserName.Equals(appUser.UserName)));
            }

            var admin = userManager.Users.FirstOrDefault(u => u.UserName.Equals(appUsers.Admin.UserName));
            var user = userManager.Users.FirstOrDefault(u => u.UserName.Equals(appUsers.User.UserName));

            foreach(var role in appUserRoles.ToList())
            {
                Assert.IsTrue(userManager.IsInRoleAsync(admin, role).Result);
            }
            Assert.IsTrue(userManager.IsInRoleAsync(user, appUserRoles.User).Result);
            Assert.IsFalse(userManager.IsInRoleAsync(user, appUserRoles.Admin).Result);
        }
    }
}
