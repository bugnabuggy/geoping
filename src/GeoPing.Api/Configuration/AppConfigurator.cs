using GeoPing.Services;
using GeoPing.Api.Helpers;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Geoping.Services;
using Geoping.Services.Configuration;

namespace GeoPing.Api.Configuration
{
    public class AppConfigurator
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRepository<GeoPoint>, DbRepository<GeoPoint>>();
            services.AddScoped<IRepository<GeoList>, DbRepository<GeoList>>();
            services.AddScoped<IRepository<PublicList>, DbRepository<PublicList>>();
            services.AddScoped<IRepository<CheckIn>, DbRepository<CheckIn>>();
            services.AddScoped<IRepository<GeoPingToken>, DbRepository<GeoPingToken>>();
            services.AddScoped<IRepository<GeoPingUser>, DbRepository<GeoPingUser>>();
            services.AddScoped<IRepository<ListReview>, DbRepository<ListReview>>();
            services.AddScoped<IRepository<ListSharing>, DbRepository<ListSharing>>();
            services.AddScoped<IRepository<SupportMessage>, DbRepository<SupportMessage>>();
            services.AddScoped<IRepository<UserDevice>, DbRepository<UserDevice>>();
            services.AddScoped<IRepository<AppIdentityUser>, DbRepository<AppIdentityUser>>();

            services.AddTransient<IEmailService, EmailService>();

            services.AddScoped<ISecurityService, SecurityService>();
            services.AddScoped<IGeopointService, GeopointService>();
            services.AddScoped<IGeolistService, GeolistService>();
            services.AddScoped<IClaimsHelper, ClaimsHelper>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IGPUserService, GPUserService>();
            services.AddScoped<ICheckInService, CheckInService>();
            services.AddScoped<ICheckInStatisticsService, CheckInStatisticsService>();
            services.AddScoped<ISharingService, SharingService>();
            services.AddScoped<IGeopingTokenService, GeopingTokenService>();
        }

        public void Initialize(IServiceProvider services)
        {
            // TODO: Make logging done here
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<AppIdentityUser>>();
            var appUserRoles = new UserRoles();
            var appUsers = new Users();
            var ctx = services.GetRequiredService<ApplicationDbContext>();
            //var logger = services.GetRequiredService<ILogger>();

            var roles = appUserRoles.ToList();

            foreach (var role in roles)
            {
                if (!roleManager.RoleExistsAsync(role).Result)
                {
                    roleManager.CreateAsync(new IdentityRole(role)).Wait(10000);
                }
            }

            var users = appUsers.ToList();

            foreach (var user in users)
            {
                if (!userManager.Users.Any(u => u.UserName.Equals(user.UserName)))
                {
                    var task = userManager.CreateAsync(user, "123QWE@qwe");
                    task.Wait(10000);
                    if (!task.Result.Succeeded)
                    {
                        //logger.LogInformation($"User with UserName [{user.UserName}] and Email [{user.Email}] was created.");
                    }
                    if (user.UserName == "testadmin")
                    {
                        task = userManager.AddToRolesAsync(user, roles);
                        //logger.LogInformation("Roles [user] and [admin] were added for user [testadmin].");
                    }
                    else
                    {
                        task = userManager.AddToRoleAsync(user, appUserRoles.User);
                        //logger.LogInformation("Role [user] and was added for user [testuser].") ;
                    }
                    task.Wait(10000);
                    if (!task.Result.Succeeded)
                    {
                        //logger.LogError("Something went wrong while addition roles for test users");
                    }

                    ctx.GPUsers.Add(new GeoPingUser()
                    {
                        IdentityId = user.Id,
                        Email = user.Email,
                        Login = user.UserName,
                        AccountType = "premium",
                        IsActivated = true,
                        Avatar = DefaultUserSettings.AvatarImage
                    });
                    ctx.SaveChanges();
                }
            }
        }
    }
}
