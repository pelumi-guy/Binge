using Binge.Application.Commons.AutoMapper;

namespace Binge.Api.Extensions
{
	public static class AutoMapperServiceExtension
	{
		public static void ConfigureAutoMappers(this IServiceCollection services)
		{
			services.AddAutoMapper(typeof(MapInitializer));
		}
	}
}