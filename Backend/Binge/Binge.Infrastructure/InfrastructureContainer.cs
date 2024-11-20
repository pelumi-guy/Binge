using Binge.Infrastructure.Repositories.Implementation;
using Binge.Infrastructure.Repositories.Interface;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Infrastructure
{
    public static class InfrastructureContainer
    {
        public static void RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IUserFavoriteMoviesRepository, UserFavoriteMoviesRepository>();
            services.AddScoped<IMovieRepository, MovieRepository>();    
        }
    }
}
