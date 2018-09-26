using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Models;
using GeoPing.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace GeoPing.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<GeoPoint> GeoPoints { get; set; }
        public DbSet<GeoCatalog> GeoCatalogs { get; set; }
        public DbSet<PointCatalog> PointCatalogs { get; set; }

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

            builder.Entity<PointCatalog>()
                .HasKey(pc => new { pc.GeoPointId, pc.GeoCatalogId });

            builder.Entity<PointCatalog>()
                .HasOne(pc => pc.Point)
                .WithMany(p => p.PointCatalogs)
                .HasForeignKey(pc => pc.GeoPointId);

            builder.Entity<PointCatalog>()
                .HasOne(pc => pc.Catalog)
                .WithMany(c => c.PointCatalogs)
                .HasForeignKey(pc => pc.GeoCatalogId);
        }
    }
}
