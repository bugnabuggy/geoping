using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class AddedFieldsToListSharingAndGPToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ListSharings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Value",
                table: "GeoPingTokens",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ListSharings");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "GeoPingTokens");
        }
    }
}
