using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class GPUserGotPhoneNumberField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "GPUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "GPUsers");
        }
    }
}
