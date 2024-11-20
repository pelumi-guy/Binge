using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Binge.Domain.Migrations
{
    /// <inheritdoc />
    public partial class V5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_Features_FeatureId",
                table: "Plans");

            migrationBuilder.DropIndex(
                name: "IX_Plans_FeatureId",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "FeatureId",
                table: "Plans");

            migrationBuilder.CreateTable(
                name: "PlanFeatures",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PlanId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FeatureId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlanFeatures_Features_FeatureId",
                        column: x => x.FeatureId,
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanFeatures_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanFeatures_FeatureId",
                table: "PlanFeatures",
                column: "FeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanFeatures_PlanId",
                table: "PlanFeatures",
                column: "PlanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlanFeatures");

            migrationBuilder.AddColumn<string>(
                name: "FeatureId",
                table: "Plans",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Plans_FeatureId",
                table: "Plans",
                column: "FeatureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_Features_FeatureId",
                table: "Plans",
                column: "FeatureId",
                principalTable: "Features",
                principalColumn: "Id");
        }
    }
}
