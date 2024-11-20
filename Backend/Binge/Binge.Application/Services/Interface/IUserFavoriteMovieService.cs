using AspNetCoreHero.Results;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Application.Services.Interface
{
    public interface IUserFavoriteMovieService
    {
        Task<bool> SaveFavoriteMovieAsync(SaveFavoriteMoviesVM movie);
        Task<IResult<List<TMDBCategory>>> GetFavoriteMoviesAsync(string userId);
        
        Task<IResult> RemoveFavoriteMovieAsync(string movieId, string userId);
    }
}
