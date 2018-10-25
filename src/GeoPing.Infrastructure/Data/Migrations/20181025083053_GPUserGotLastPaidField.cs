using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class GPUserGotLastPaidField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastPaid",
                table: "GPUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastPaid",
                table: "GPUsers");
        }
    }
}
