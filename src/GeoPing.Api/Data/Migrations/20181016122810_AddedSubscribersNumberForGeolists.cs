using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Api.Data.Migrations
{
    public partial class AddedSubscribersNumberForGeolists : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubscribersNumber",
                table: "GeoLists",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubscribersNumber",
                table: "GeoLists");
        }
    }
}
