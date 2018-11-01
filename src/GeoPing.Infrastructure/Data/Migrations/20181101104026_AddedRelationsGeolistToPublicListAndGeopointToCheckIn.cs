using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class AddedRelationsGeolistToPublicListAndGeopointToCheckIn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_GeoPoints_ListId",
                table: "GeoPoints",
                column: "ListId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckIns_PointId",
                table: "CheckIns",
                column: "PointId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckIns_GeoPoints_PointId",
                table: "CheckIns",
                column: "PointId",
                principalTable: "GeoPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GeoPoints_GeoLists_ListId",
                table: "GeoPoints",
                column: "ListId",
                principalTable: "GeoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckIns_GeoPoints_PointId",
                table: "CheckIns");

            migrationBuilder.DropForeignKey(
                name: "FK_GeoPoints_GeoLists_ListId",
                table: "GeoPoints");

            migrationBuilder.DropIndex(
                name: "IX_GeoPoints_ListId",
                table: "GeoPoints");

            migrationBuilder.DropIndex(
                name: "IX_CheckIns_PointId",
                table: "CheckIns");
        }
    }
}
