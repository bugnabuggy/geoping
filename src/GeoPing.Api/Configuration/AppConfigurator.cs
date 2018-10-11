using GeoPing.Api.Data;
using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.Entities;
using GeoPing.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class AppConfigurator
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRepository<GeoList>, DbRepository<GeoList>>();
            services.AddScoped<IRepository<GeoPoint>, DbRepository<GeoPoint>>();
            services.AddScoped<IRepository<UserPoint>, DbRepository<UserPoint>>();

            services.AddScoped<IGeopointService, GeopointService>();
            services.AddScoped<IGeolistService, GeolistService>();
            services.AddScoped<IHelper, Helper>();
        }

        public void Initialize(IServiceProvider services)
        {
            // TODO: Make logging done here
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var appUserRoles = new UserRoles();
            var appUsers = new Users();
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
                }
            }
        }
    }
}
