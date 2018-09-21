using GeoPing.Api.Data;
using GeoPing.Api.Models;
using GeoPing.Api.Models.AccountDTO;
using GeoPing.Api.Models.AccountViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api
{
    public static class SeedData
    {
        public static void Initialize(
            IServiceProvider serviceProvider, 
            UserManager<ApplicationUser> userManager/*,
            RoleManager<IdentityRole> roleManager*/)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.EnsureCreated();

            //if (roleManager.FindByNameAsync("admin") == null)
            //{
            //    roleManager.CreateAsync(new IdentityRole("admin"));
            //}
            //if (roleManager.FindByNameAsync("user") == null)
            //{
            //    roleManager.CreateAsync(new IdentityRole("user"));
            //}


            //if (!context.Roles.Any())
            //{
            //    roleManager.CreateAsync(new IdentityRole("admin"));
            //    roleManager.CreateAsync(new IdentityRole("user"));
            //}

            if (!context.Users.Any())
            {
                var testUserModel = new RegisterUserDTO
                {
                    Email = "testuser@gmail.com",
                    Password = "123QWE@qwe"
                };
                var testUser = new ApplicationUser
                {
                    UserName = testUserModel.Email,
                    Email = testUserModel.Email,
                };
                userManager.AddToRoleAsync(testUser, "user");
                var resultTestUser = userManager.CreateAsync(testUser, testUserModel.Password);

                var testAdminModel = new RegisterUserDTO
                {
                    Email = "testadmin@gmail.com",
                    Password = "123QWE@qwe"
                };
                var testAdmin = new ApplicationUser
                {
                    UserName = testAdminModel.Email,
                    Email = testAdminModel.Email,
                };
                userManager.AddToRolesAsync(testAdmin, new List<string> {"user", "admin"});
                var resultTestAdmin = userManager.CreateAsync(testAdmin, testAdminModel.Password);
            }
        }
    }
}
