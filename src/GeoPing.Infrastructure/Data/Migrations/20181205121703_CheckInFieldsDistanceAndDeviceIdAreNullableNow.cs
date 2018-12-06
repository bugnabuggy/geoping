using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class CheckInFieldsDistanceAndDeviceIdAreNullableNow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Distance",
                table: "CheckIns",
                nullable: true,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<Guid>(
                name: "DeviceId",
                table: "CheckIns",
                nullable: true,
                oldClrType: typeof(Guid));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Distance",
                table: "CheckIns",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "DeviceId",
                table: "CheckIns",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);
        }
    }
}
