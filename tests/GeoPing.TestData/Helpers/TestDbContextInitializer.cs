using GeoPing.Api.Configuration;
using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Data;
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
        public void SeedData(IServiceProvider services)
        {
            var httpContextAccessor = services.GetService<IHttpContextAccessor>();
            var principal = new ClaimsPrincipal(httpContextAccessor.HttpContext.User);
            var userRoles = new UserRoles();
            httpContextAccessor.HttpContext.User = new GenericPrincipal(
                new GenericIdentity("GP system initialization"), new[] { userRoles.Admin });

            var appConfigurator = new AppConfigurator();
            appConfigurator.Initialize(services);
            
            //return default principal back;
            httpContextAccessor.HttpContext.User = principal;

            SeedTestList(services);
        }

        private void SeedTestList(IServiceProvider services)
        {
            var _geolistRepo = services.GetRequiredService<IRepository<GeoList>>();

            _geolistRepo.Add(new GeoList
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000005"),
                Name = "TestList5",
                OwnerId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Created = DateTime.UtcNow,
                IsPublic = true
            });
        }
    }
}
