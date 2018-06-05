using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Infrastructure
{
    public class TMDbContext : IdentityDbContext<TMUser>
    {
        public TMDbContext(DbContextOptions<TMDbContext> options)
            : base(options)
        {
        }
    }
}
