using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Infrastructure.Repositories.Interface
{
    public interface IUserFavoriteMoviesRepository
    {
        Task<bool> SaveFavoriteMovieAsync(SaveFavoriteMoviesVM movie);
        Task<List<TMDBCategory>> GetFavouriteMoviesAsync(string userId);

        Task<UserFavoriteMovie?> GetUserFaveMovie(string movieId, string userId);

        Task<int> RemoveFavoriteMovieAsync(UserFavoriteMovie userFavoriteMovie);
    }
}

