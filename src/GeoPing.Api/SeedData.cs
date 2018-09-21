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
        public static void InitializeAsync(ApplicationDbContext dbContext, 
            UserManager<ApplicationUser> userManager)
        {
            dbContext.Database.EnsureCreated();

            if (!dbContext.Users.Any())
            {
                var testUserModel = new RegisterUserDTO
                {
                    UserName = "TestUser",
                    Email = "testuser@gmail.com",
                    Password = "123QWE@qwe"
                };
                var testUser = new ApplicationUser
                {
                    UserName = testUserModel.UserName,
                    Email = testUserModel.Email,
                };
                userManager.CreateAsync(testUser, testUserModel.Password);

                var testAdminModel = new RegisterUserDTO
                {
                    UserName = "TestAdmin",
                    Email = "testadmin@gmail.com",
                    Password = "123QWE@qwe"
                };
                var testAdmin = new ApplicationUser
                {
                    UserName = testAdminModel.UserName,
                    Email = testAdminModel.Email,
                };
                userManager.CreateAsync(testAdmin, testAdminModel.Password);
            }
        }
    }
}
