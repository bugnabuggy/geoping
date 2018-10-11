using GeoPing.Api.Configuration;
using GeoPing.Api.Data;
using GeoPing.Api.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.TestData.Helpers
{
    class TestDbContextInitializer
    {
        private static bool _isInitialised = false;
        private ApplicationDbContext _ctx;

        public async Task SeedData(IServiceProvider services)
        {
            var appConfigurator = new AppConfigurator();
            appConfigurator.Initialize(services);

            _ctx = services.GetService<ApplicationDbContext>();
            var apiUserSrv = services.GetService<N2NApiUserService>();

            var _userManager = services.GetService<UserManager<N2NIdentityUser>>();
            await _userManager.CreateAsync(N2N.TestData.N2NUsersList.GetN2NIdentityUser(), HardCoddedConfig.DefaultPassword);
        }
    }
}
