using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoPing.Infrastructure.Data.Migrations
{
    public partial class AddedOrderAndCommodityEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AccountUpgradeExpirationTime",
                table: "GPUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Commodities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Cost = table.Column<double>(nullable: false),
                    Quantity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commodities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    CommodityId = table.Column<Guid>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Commodities");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropColumn(
                name: "AccountUpgradeExpirationTime",
                table: "GPUsers");
        }
    }
}
