using GeoPing.Api.Configuration;
using GeoPing.Api.Data;
using GeoPing.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.TestData.Helpers
{
    public class TestDbContextInitializer
    {
        private static bool _isInitialised = false;
        private ApplicationDbContext _ctx;
        private ApplicationUser[] _users;

        public async Task SeedData(IServiceProvider services)
        {
            var httpContextAccessor = services.GetService<IHttpContextAccessor>();
            var principal = new ClaimsPrincipal(httpContextAccessor.HttpContext.User);
            httpContextAccessor.HttpContext.User = new GenericPrincipal(new GenericIdentity("GP system initialization"), new[] { UserRoles.Admin });

            var appConfigurator = new AppConfigurator();
            appConfigurator.Initialize(services);

            _ctx = services.GetService<ApplicationDbContext>();

            var _userManager = services.GetService<UserManager<ApplicationUser>>();
            await _userManager.CreateAsync(AppUsersList.GetIdentityUser(), TestConfig.DefaultPassword);

            _users = AppUsersList.GetList().ToArray();

            foreach (var user in _users)
            {
                var result = await _userManager.CreateAsync(user, TestConfig.DefaultPassword);
                if (!result.Succeeded)
                {
                    throw new Exception(string.Concat(result.Errors));
                }
            }

            //to avoid foreing keys insert conflicts
            foreach (var user in _users)
            {
                //AddPromises(user, _ctx);
                //AddPostcards(user, _ctx);
                //AddAddressess(user, _ctx);
            }

            //return default principal back;
            httpContextAccessor.HttpContext.User = principal;
        }
    }
}
