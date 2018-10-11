using GeoPing.Api.Data;
using GeoPing.Api.Models;
using GeoPing.Api.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider services)
        {
            // TODO: Make logging done here
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            //var logger = services.GetRequiredService<ILogger>();

            var roles = new List<IdentityRole>()
            {
                new IdentityRole("admin"),
                new IdentityRole("user")
            };

            foreach (var role in roles)
            {
                if (!roleManager.RoleExistsAsync(role.Name).Result)
                {
                    roleManager.CreateAsync(role).Wait(10000);
                }
            }

            var users = new List<ApplicationUser>()
            {
                new ApplicationUser()
                {
                    UserName = "testadmin",
                    Email = "testadmin@geoping.com"
                },
                new ApplicationUser()
                {
                    UserName = "testuser",
                    Email = "testuser@geoping.com"
                }
            };

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
                        task = userManager.AddToRolesAsync(user, new List<string> { "user", "admin" });
                        //logger.LogInformation("Roles [user] and [admin] were added for user [testadmin].");
                    }
                    else
                    {
                        task = userManager.AddToRoleAsync(user, "user");
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
