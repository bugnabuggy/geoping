using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Models;
using GeoPing.Api.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GeoPing.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<GeoPoint> GeoPoints { get; set; }
        public DbSet<GeoList> GeoLists { get; set; }
        public DbSet<UserLists> UserLists { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            // Many-to-one relations between points and list
            builder.Entity<GeoList>()
                 .HasMany<GeoPoint>(l => l.GeoPoints)
                 .WithOne(p => p.GeoList)
                 .HasForeignKey(p => p.GeoListId)
                 .OnDelete(DeleteBehavior.Cascade);

            // Many-to-many relations between users and lists
            // UserLists is the connection class
            builder.Entity<UserLists>()
                .HasKey(ul => new { ul.UserId, ul.ListId });

            builder.Entity<UserLists>()
                .HasOne<ApplicationUser>(ul => ul.User)
                .WithMany(u => u.Userlists)
                .HasForeignKey(ul => ul.UserId);

            builder.Entity<UserLists>()
                .HasOne<GeoList>(ul => ul.GeoList)
                .WithMany(l => l.UsersLists)
                .HasForeignKey(ul => ul.ListId);
        }
    }
}
