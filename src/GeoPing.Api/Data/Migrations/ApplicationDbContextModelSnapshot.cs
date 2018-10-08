﻿// <auto-generated />
using System;
using GeoPing.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GeoPing.Api.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GeoPing.Api.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<short>("AccountType");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FullName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.GeoList", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasMaxLength(240);

                    b.Property<bool>("IsPublic");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("OwnerId");

                    b.Property<DateTime>("PeriodFrom");

                    b.Property<DateTime>("PeriodTo");

                    b.Property<float>("Rating");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("GeoLists");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.GeoPoint", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasMaxLength(240);

                    b.Property<long>("GeoListId");

                    b.Property<double>("Latitude");

                    b.Property<double>("Longitude");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<double>("Radius");

                    b.HasKey("Id");

                    b.HasIndex("GeoListId");

                    b.ToTable("GeoPoints");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.ListReview", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment")
                        .HasMaxLength(240);

                    b.Property<long>("ListId");

                    b.Property<float>("Rating");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ListId");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.UserList", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<long>("ListId");

                    b.Property<bool>("IsTrusted");

                    b.HasKey("UserId", "ListId");

                    b.HasIndex("ListId");

                    b.ToTable("UserLists");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.UserPoint", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<long>("PointId");

                    b.Property<DateTime>("CheckTime");

                    b.HasKey("UserId", "PointId");

                    b.HasIndex("PointId");

                    b.ToTable("UserPoints");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.GeoList", b =>
                {
                    b.HasOne("GeoPing.Api.Models.ApplicationUser", "Owner")
                        .WithMany("OwnedLists")
                        .HasForeignKey("OwnerId");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.GeoPoint", b =>
                {
                    b.HasOne("GeoPing.Api.Models.Entities.GeoList", "GeoList")
                        .WithMany("GeoPoints")
                        .HasForeignKey("GeoListId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.ListReview", b =>
                {
                    b.HasOne("GeoPing.Api.Models.Entities.GeoList", "List")
                        .WithMany("Reviews")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GeoPing.Api.Models.ApplicationUser", "User")
                        .WithMany("UserReviews")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.UserList", b =>
                {
                    b.HasOne("GeoPing.Api.Models.Entities.GeoList", "GeoList")
                        .WithMany("UsersLists")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GeoPing.Api.Models.ApplicationUser", "User")
                        .WithMany("GeoLists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GeoPing.Api.Models.Entities.UserPoint", b =>
                {
                    b.HasOne("GeoPing.Api.Models.Entities.GeoPoint", "Point")
                        .WithMany("UserPoints")
                        .HasForeignKey("PointId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GeoPing.Api.Models.ApplicationUser", "User")
                        .WithMany("GeoPoints")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("GeoPing.Api.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("GeoPing.Api.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GeoPing.Api.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("GeoPing.Api.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
