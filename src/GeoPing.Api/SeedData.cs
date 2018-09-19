using GeoPing.Api.Data;
using GeoPing.Api.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                ApplicationUser testUser = new ApplicationUser
                {
                    UserName = "testuser@gmail.com",
                    NormalizedUserName = "TESTUSER@GMAIL.COM",
                    Email = "testuser@gmail.com",
                    NormalizedEmail = "TESTUSER@GMAIL.COM",
                    EmailConfirmed = false,
                    Id = "5855dad6-6202-4131-a934-c4920f049ee2",
                    ConcurrencyStamp = "830d3e2e-51b7-47ff-82ca-ad864371a9f3",
                    PasswordHash = "AQAAAAEAACcQAAAAEOUDxk7ccxvHtLcOX8qObtck6VHkBl/48qpx8HV/wpXf+lPhRZuKP/UzbOkbsaojYQ==",
                    SecurityStamp = "4fe04c12-4927-44a9-9e58-09c4f6b49647",
                    AccessFailedCount = 0,
                    PhoneNumber = null,
                    PhoneNumberConfirmed = false,
                    LockoutEnd = null,
                    LockoutEnabled = true,
                    TwoFactorEnabled = false
                };
                ApplicationUser testAdmin = new ApplicationUser
                {
                    UserName = "testadmin@gmail.com",
                    NormalizedUserName = "TESTADMIN@GMAIL.COM",
                    Email = "testadmin@gmail.com",
                    NormalizedEmail = "TESTADMIN@GMAIL.COM",
                    EmailConfirmed = false,
                    Id = "137a65db-b1fa-4f9f-994d-31c819ed942f",
                    ConcurrencyStamp = "22d6c5b6-ecfe-4289-ad9c-8aaf5b09193f",
                    PasswordHash = "AQAAAAEAACcQAAAAEOkerHrClhUR7398+buvk9VIWmYYStD8hop4EhteIE0SJUXPNQsnAT5OS3Dh4xnOtw==",
                    SecurityStamp = "5672c590-1f3d-44ff-9098-5d20fc3433e4",
                    AccessFailedCount = 0,
                    PhoneNumber = null,
                    PhoneNumberConfirmed = false,
                    LockoutEnd = null,
                    LockoutEnabled = true,
                    TwoFactorEnabled = false
                };

                context.Users.Add(testUser);
                context.Users.Add(testAdmin);

                context.SaveChanges();
            }
        }
    }
}
