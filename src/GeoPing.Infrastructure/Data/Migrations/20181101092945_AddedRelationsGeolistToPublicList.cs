using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class AddedRelationsGeolistToPublicList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PublicLists_ListId",
                table: "PublicLists",
                column: "ListId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PublicLists_GeoLists_ListId",
                table: "PublicLists",
                column: "ListId",
                principalTable: "GeoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PublicLists_GeoLists_ListId",
                table: "PublicLists");

            migrationBuilder.DropIndex(
                name: "IX_PublicLists_ListId",
                table: "PublicLists");
        }
    }
}
