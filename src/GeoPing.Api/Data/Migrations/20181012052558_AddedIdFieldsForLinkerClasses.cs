using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Api.Data.Migrations
{
    public partial class AddedIdFieldsForLinkerClasses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "UserPoints",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "UserLists",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_UserPoints_Id",
                table: "UserPoints",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_UserLists_Id",
                table: "UserLists",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_UserPoints_Id",
                table: "UserPoints");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_UserLists_Id",
                table: "UserLists");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserPoints");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserLists");
        }
    }
}
