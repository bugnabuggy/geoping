using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace GeoPing.Api.Data.Migrations
{
    public partial class InitialApplicationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GeoCatalogs",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 140, nullable: false),
                    isPublic = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeoCatalogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GeoPoints",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(maxLength: 240, nullable: true),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Radius = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeoPoints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PointCatalogs",
                columns: table => new
                {
                    GeoPointId = table.Column<long>(nullable: false),
                    GeoCatalogId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointCatalogs", x => new { x.GeoPointId, x.GeoCatalogId });
                    table.ForeignKey(
                        name: "FK_PointCatalogs_GeoCatalogs_GeoCatalogId",
                        column: x => x.GeoCatalogId,
                        principalTable: "GeoCatalogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PointCatalogs_GeoPoints_GeoPointId",
                        column: x => x.GeoPointId,
                        principalTable: "GeoPoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PointCatalogs_GeoCatalogId",
                table: "PointCatalogs",
                column: "GeoCatalogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PointCatalogs");

            migrationBuilder.DropTable(
                name: "GeoCatalogs");

            migrationBuilder.DropTable(
                name: "GeoPoints");
        }
    }
}
