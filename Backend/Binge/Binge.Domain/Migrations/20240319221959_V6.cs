using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Binge.Domain.Migrations
{
    /// <inheritdoc />
    public partial class V6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PlanEndDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlanId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PlanStartDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PlanPayment",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PlanId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransactionReference = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: true),
                    Months = table.Column<int>(type: "int", nullable: false),
                    PaymentStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanPayment", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlanPayment");

            migrationBuilder.DropColumn(
                name: "PlanEndDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PlanId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PlanStartDate",
                table: "AspNetUsers");
        }
    }
}
