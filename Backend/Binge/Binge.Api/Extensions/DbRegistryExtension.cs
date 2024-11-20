using Binge.Domain.Context;
using Microsoft.EntityFrameworkCore;

namespace Binge.Api.Extensions
{
	public static class DbRegistryExtension
	{
		public static void AddDbContextAndConfigurations(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddDbContextFactory<BingeContext>(options =>
			{
				options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
			});
		}
	}
}