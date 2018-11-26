using GeoPing.Infrastructure.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppIdentityUser>
    {
        public DbSet<GeoPoint> GeoPoints { get; set; }
        public DbSet<GeoList> GeoLists { get; set; }
        public DbSet<PublicList> PublicLists { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
        public DbSet<GeoPingToken> GeoPingTokens { get; set; }
        public DbSet<GeoPingUser> GPUsers { get; set; }
        public DbSet<ListReview> Reviews { get; set; }
        public DbSet<ListSharing> ListSharings { get; set; }
        public DbSet<SupportMessage> SupportMessages { get; set; }
        public DbSet<UserDevice> UserDevices { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // One-to-one relationship of GeoList and PublicList
            builder.Entity<PublicList>()
                .HasOne<GeoList>(pl => pl.Geolist)
                .WithOne()
                .HasForeignKey<PublicList>(pl => pl.ListId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-many relationship of Geolist and Geopoints
            builder.Entity<GeoPoint>()
                .HasOne<GeoList>(gp => gp.Geolist)
                .WithMany()
                .HasForeignKey(gp => gp.ListId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-many relationship of Geopoint and Checks In
            builder.Entity<CheckIn>()
                .HasOne<GeoPoint>(ch => ch.Geopoint)
                .WithMany()
                .HasForeignKey(ch => ch.PointId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-many relationship of GeoList and ListSharings
            builder.Entity<ListSharing>()
                .HasOne<GeoList>(ls => ls.List)
                .WithMany()
                .HasForeignKey(ls => ls.ListId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
