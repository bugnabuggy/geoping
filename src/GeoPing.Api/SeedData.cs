using GeoPing.Api.Data;
using GeoPing.Api.Models;
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
        public static void Initialize(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                var testUserModel = new RegisterViewModel
                {
                    Email = "testuser@gmail.com",
                    Password = "123QWE@qwe"
                };
                var testUser = new ApplicationUser
                {
                    UserName = testUserModel.Email,
                    Email = testUserModel.Email,
                };
                var resultTestUser = userManager.CreateAsync(testUser, testUserModel.Password);

                var testAdminModel = new RegisterViewModel
                {
                    Email = "testadmin@gmail.com",
                    Password = "123QWE@qwe"
                };
                var testAdmin = new ApplicationUser
                {
                    UserName = testAdminModel.Email,
                    Email = testAdminModel.Email,
                };
                var resultTestAdmin = userManager.CreateAsync(testAdmin, testAdminModel.Password);
            }
        }
    }
}
