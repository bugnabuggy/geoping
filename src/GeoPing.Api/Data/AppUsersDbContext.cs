using GeoPing.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Data
{
    public class AppUsersDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppUsersDbContext(DbContextOptions<AppUsersDbContext> options)
            : base(options)
        {

        }
    }
}
