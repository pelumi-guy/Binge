using Binge.Infrastructure.Implementation;
using Binge.Infrastructure.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Binge.Infrastructure
{
	public static class DependencyInjection
	{
		public static void ConfigureInfraStructure(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddScoped<IEmailService, EmailService>();
		}
	}
}