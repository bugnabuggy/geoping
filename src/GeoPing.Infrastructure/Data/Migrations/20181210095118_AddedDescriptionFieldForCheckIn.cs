using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class AddedDescriptionFieldForCheckIn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CheckIns",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "CheckIns");
        }
    }
}
