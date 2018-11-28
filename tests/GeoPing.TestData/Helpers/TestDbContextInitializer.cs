using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using GeoPing.Api.Configuration;
using GeoPing.Api.Configuration.SeededData;
using GeoPing.Core.Models.Entities;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

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

            SeedUsers(services);
            SeedTestLists(services);
            SeedTestPublicLists(services);
            SeedTestPoints(services);
            SeedTestChecksIn(services);
        }

        private async Task SeedUsers(IServiceProvider services)
        {
            var userManager = services.GetRequiredService<UserManager<AppIdentityUser>>();
            var gpUserRepo = services.GetRequiredService<IRepository<GeoPingUser>>();
            var users = new TestUsers();

            foreach (var user in users.GetUsers())
            {
                await userManager.CreateAsync
                (
                    new AppIdentityUser
                    {
                        Id = user.Id.ToString(),
                        Email = user.Email,
                        UserName = user.UserName,
                        EmailConfirmed = true
                    }
                );

                gpUserRepo.Add
                (
                    new GeoPingUser
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Login = user.UserName,
                        Birthday = user.Birthday,
                        PhoneNumber = user.PhoneNumber,
                        Country = user.Country,
                        AccountType = "regular",
                        IsActivated = true,
                        IdentityId = user.Id.ToString(),
                        Avatar = user.Avatar
                    }
                );
            }
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

        private void SeedListSharings(IServiceProvider services)
        {
            var sharingsRepo = services.GetRequiredService<IRepository<ListSharing>>();
            var sharings = new TestSharings();

            foreach (var sharing in sharings.GetListSharings())
            {
                sharingsRepo.Add(sharing);
            }
        }
    }
}
