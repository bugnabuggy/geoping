using GeoPing.Core.Entities;
using GeoPing.Infrastructure.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

            //// Many-to-one relations between points and list
            //builder.Entity<GeoList>()
            //     .HasMany<GeoPoint>(l => l.GeoPoints)
            //     .WithOne(p => p.GeoList)
            //     .HasForeignKey(p => p.GeoListId)
            //     .OnDelete(DeleteBehavior.Cascade);
            //
            //// Many-to-one relations between owned lists and owner-user
            //builder.Entity<ApplicationUser>()
            //     .HasMany<GeoList>(u => u.OwnedLists)
            //     .WithOne(l => l.Owner)
            //     .HasForeignKey(l => l.OwnerId);
            //
            //// Many-to-one relations between reviews and list
            //builder.Entity<GeoList>()
            //     .HasMany<ListReview>(l => l.Reviews)
            //     .WithOne(r => r.List)
            //     .HasForeignKey(r => r.ListId)
            //     .OnDelete(DeleteBehavior.Cascade);
            //
            //// Many-to-one relations between reviews and user
            //builder.Entity<ApplicationUser>()
            //     .HasMany<ListReview>(u => u.UserReviews)
            //     .WithOne(r => r.User)
            //     .HasForeignKey(r => r.UserId);
            //
            //
            //// Many-to-many relations between users and lists
            //// UserList is the connection class
            //builder.Entity<UserList>()
            //    .HasKey(ul => new { ul.UserId, ul.ListId });
            //
            //builder.Entity<UserList>()
            //    .HasOne<ApplicationUser>(ul => ul.User)
            //    .WithMany(u => u.GeoLists)
            //    .HasForeignKey(ul => ul.UserId);
            //
            //builder.Entity<UserList>()
            //    .HasOne<GeoList>(ul => ul.GeoList)
            //    .WithMany(l => l.UsersLists)
            //    .HasForeignKey(ul => ul.ListId);
            //
            //// Many-to-many relations between users and points
            //// UserPoint is the connection class
            //builder.Entity<UserPoint>()
            //    .HasKey(ul => new { ul.UserId, ul.PointId });
            //
            //builder.Entity<UserPoint>()
            //    .HasOne<ApplicationUser>(up => up.User)
            //    .WithMany(u => u.GeoPoints)
            //    .HasForeignKey(up => up.UserId);
            //
            //builder.Entity<UserPoint>()
            //    .HasOne<GeoPoint>(up => up.Point)
            //    .WithMany(p => p.UserPoints)
            //    .HasForeignKey(up => up.PointId);
        }
    }
}
