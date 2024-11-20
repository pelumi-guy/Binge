using Binge.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Binge.Domain.Context
{
	public class BingeContext : IdentityDbContext<AppUser>
	{
		public BingeContext(DbContextOptions<BingeContext> getData) : base(getData)
		{
		}

		public DbSet<Movie> Movies { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<MovieCategory> MovieCategories { get; set; }

		public DbSet<UserFavoriteMovie> UserFavoriteMovies { get; set; }
		public DbSet<Plan> Plans { get; set; }
		public DbSet<Feature> Features { get; set; }
		public DbSet<PlanFeature> PlanFeatures { get; set; }
		public DbSet<PlanPayment> PlanPayment { get; set; }


		public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
		{
			foreach (var item in ChangeTracker.Entries<BaseEntity>())
			{
				switch (item.State)
				{
					case EntityState.Modified:
						item.Entity.UpdatedAt = DateTime.UtcNow;
						break;
					case EntityState.Added:
						item.Entity.Id = Guid.NewGuid().ToString();
						item.Entity.CreatedAt = DateTime.UtcNow;
						break;
					case EntityState.Detached:
					case EntityState.Unchanged:
					default:
						break;
				}
			}

			return await base.SaveChangesAsync(cancellationToken);
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			var decimalProps = modelBuilder.Model
				.GetEntityTypes()
				.SelectMany(t => t.GetProperties())
				.Where(p => (Nullable.GetUnderlyingType(p.ClrType) ?? p.ClrType) == typeof(decimal));

			foreach (var property in decimalProps)
			{
				property.SetPrecision(18);
				property.SetScale(2);
			}

			base.OnModelCreating(modelBuilder);
		}
	}
}