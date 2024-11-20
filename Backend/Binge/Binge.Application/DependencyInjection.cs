using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using FluentValidation;
using Binge.Infrastructure.Exceptions;
using Binge.Application.Services.Interface;
using Binge.Application.Services.Implementation;
using RestSharp;

namespace Binge.Application
{
	public static class DependencyInjection
	{
		public static void ConfigureApplication(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddMediatR(s => s.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
			services.AddAutoMapper(Assembly.GetExecutingAssembly());
			services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
			services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidatorBehavior<,>));
			services.AddScoped<ICategoryService>(serviceProvider =>
			{
				var restClient = serviceProvider.GetRequiredService<IRestClient>();
				return new CategoryService(restClient, "28dda9f76d76f128b47831768bc9a103");
			});
			services.AddScoped<IUserFavoriteMovieService, UserFavoriteMovieService>();
			services.AddScoped<IMovieService, MovieService>();
			services.AddScoped<IPlanService, PlanService>();
		}
	}
}