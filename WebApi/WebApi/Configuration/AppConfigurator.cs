using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApi.Models;

namespace WebApi.Configuration
{
    public class AppConfigurator
    {
        //public static void ConfigureDataServices(IServiceCollection services)
        //{
        //    services.AddScoped<IRepository<User>, DbRepository<User>>();
        //    services.AddScoped<IRepository<Broker>, DbRepository<Broker>>();
        //    services.AddScoped<IRepository<Routing>, DbRepository<Routing>>();
        //    services.AddScoped<IRepository<Country>, DbRepository<Country>>();
        //    services.AddScoped<IRepository<Affilate>, DbRepository<Affilate>>();
        //    services.AddScoped<IRepository<Offer>, DbRepository<Offer>>();
        //    services.AddScoped<IRepository<BrokersUsers>, DbRepository<BrokersUsers>>();


        //    services.AddScoped<IBrokerService, BrokerService>();
        //    services.AddScoped<IRoutingService, RoutingService>();
        //    services.AddScoped<IBrokersUsersService, BrokersUsersService>();
        //    services.AddScoped<IDynamicsService, DynamicsService>();
        //}



        public static void InitRolesAndUsers(IServiceProvider services)
        {
            var roles = new List<IdentityRole>()
            {
                new IdentityRole("Admin"),
                new IdentityRole("User")
            };

            var users = new Dictionary<TMUser, string>()
            {
                {new TMUser(){ UserName = "admin"}, "Password@123"},
            };

            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<TMUser>>();
            var logger = services.GetRequiredService<ILogger<Program>>();
            var config = services.GetRequiredService<IConfigurationRoot>();

            foreach (var role in roles)
            {
                if (!roleManager.RoleExistsAsync(role.Name).Result)
                {
                    roleManager.CreateAsync(role).Wait(Constants.AsyncTaskWaitTime);
                }
            }

            foreach (var user in users)
            {
                if (!userManager.Users.Any(u => u.UserName.Equals(user.Key.UserName)))
                {
                    var task = userManager.CreateAsync(user.Key, user.Value);
                    task.Wait(Constants.AsyncTaskWaitTime);
                    var result = task.Result;
                    if (!result.Succeeded)
                    {
                        logger.LogError(string.Join("\n", result.Errors.Select(x => x.Description)));
                    }
                }
            }

            bool.TryParse(config["ResetAdminPassword"], out bool resetPassword);
            
            if (resetPassword)
            {
                var admin = userManager.FindByNameAsync("admin").Result;
                var token = userManager.GeneratePasswordResetTokenAsync(admin ).Result;
                var result = userManager.ResetPasswordAsync(admin, token, config["NewPassword"] ?? "Pasword@123").Result;
            }
        }

       
    }
}
