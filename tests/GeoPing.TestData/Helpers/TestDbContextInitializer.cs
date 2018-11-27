using GeoPing.Api.Configuration;
using GeoPing.Api.Configuration.SeededData;
using GeoPing.Core.Models.Entities;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Security.Claims;
using System.Security.Principal;

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

            SeedTestLists(services);
            SeedTestPublicLists(services);
            SeedTestPoints(services);
            SeedTestChecksIn(services);
        }

        private void SeedTestPublicLists(IServiceProvider services)
        {
            var publicListsRepo = services.GetRequiredService<IRepository<PublicList>>();
            var lists = new TestLists();

            foreach (var list in lists.GetPublicGeolists())
            {
                publicListsRepo.Add(list);
            }
        }

        private void SeedTestChecksIn(IServiceProvider services)
        {
            var checkInRepo = services.GetRequiredService<IRepository<CheckIn>>();
            var checksIn = new TestChecksIn();

            foreach (var checkIn in checksIn.GetChecksIn())
            {
                checkInRepo.Add(checkIn);
            }
        }

        private void SeedTestLists(IServiceProvider services)
        {
            var geolistRepo = services.GetRequiredService<IRepository<GeoList>>();
            var lists = new TestLists();

            foreach (var list in lists.GetGeolists())
            {
                geolistRepo.Add(list);
            }
        }

        private void SeedTestPoints(IServiceProvider services)
        {
            var geopointRepo = services.GetRequiredService<IRepository<GeoPoint>>();
            var points = new TestPoints();

            foreach (var point in points.GetGeopoints())
            {
                geopointRepo.Add(point);
            }
        }
    }
}
