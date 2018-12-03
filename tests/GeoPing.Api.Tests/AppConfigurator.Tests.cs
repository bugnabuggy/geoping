using System.Linq;
using GeoPing.Api.Configuration;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using GeoPing.TestData.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

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
            var ctx = services.GetService<ApplicationDbContext>();
            var userRoles = ctx.Roles;
            var users = ctx.Users;
            
            foreach (var identityUser in users.ToList())
            {
                Assert.IsTrue(userManager.Users.Any(u => u.Email.Equals(identityUser.Email)));
                Assert.IsTrue(userManager.Users.Any(u => u.UserName.Equals(identityUser.UserName)));
                Assert.IsTrue(ctx.GPUsers.Any(u => u.IdentityId == identityUser.Id));
            }

            var admin = userManager.Users.FirstOrDefault(u => u.UserName.Equals("testadmin"));
            var user = userManager.Users.FirstOrDefault(u => u.UserName.Equals("testuser"));

            foreach(var role in userRoles.ToList())
            {
                Assert.IsTrue(userManager.IsInRoleAsync(admin, role.Name).Result);
            }
            Assert.IsTrue(userManager.IsInRoleAsync(user, "user").Result);
            Assert.IsFalse(userManager.IsInRoleAsync(user, "admin").Result);
        }
    }
}
