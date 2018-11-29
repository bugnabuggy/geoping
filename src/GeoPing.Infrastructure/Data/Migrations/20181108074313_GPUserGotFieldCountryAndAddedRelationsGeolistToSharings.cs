using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class GPUserGotFieldCountryAndAddedRelationsGeolistToSharings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "GPUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ListSharings_ListId",
                table: "ListSharings",
                column: "ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_ListSharings_GeoLists_ListId",
                table: "ListSharings",
                column: "ListId",
                principalTable: "GeoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListSharings_GeoLists_ListId",
                table: "ListSharings");

            migrationBuilder.DropIndex(
                name: "IX_ListSharings_ListId",
                table: "ListSharings");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "GPUsers");
        }
    }
}
