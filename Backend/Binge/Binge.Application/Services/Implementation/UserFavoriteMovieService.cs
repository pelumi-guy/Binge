using AspNetCoreHero.Results;
using Binge.Application.Services.Interface;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Binge.Application.Services.Implementation
{
    public class UserFavoriteMovieService : IUserFavoriteMovieService
    {
        private readonly IUserFavoriteMoviesRepository _repository;
        private readonly IUserService _userService;

        public UserFavoriteMovieService(IUserFavoriteMoviesRepository repository, IUserService userService)
        {
            _repository = repository;
            _userService = userService;
        }

        public async Task<bool> SaveFavoriteMovieAsync(SaveFavoriteMoviesVM movie)
        {
          
            // Call the data access layer to save the favorite movie
            return await _repository.SaveFavoriteMovieAsync(movie);
        }

        public async Task<IResult<List<TMDBCategory>>> GetFavoriteMoviesAsync(string userId)
        {
            var user = await _userService.GetUserById(userId);

            if (user == null)
            {
                return await Result<List<TMDBCategory>>.FailAsync($"User {ErrorMessages.DataNotExist}");
            }

            var responseData = await _repository.GetFavouriteMoviesAsync(userId);

            return await Result<List<TMDBCategory>>.SuccessAsync(responseData);
        }

        public async Task<IResult> RemoveFavoriteMovieAsync(string movieId, string userId)
        {
            var userMovie = await _repository.GetUserFaveMovie(movieId, userId);
            if (userMovie == null)
            {
                return await Result.FailAsync($"Movie {ErrorMessages.DataNotExist}");
            }

            var updatedCount = await _repository.RemoveFavoriteMovieAsync(userMovie);
            if (updatedCount > 0)
            {
                return await Result.SuccessAsync($"Movie {ErrorMessages.RemovedSuccessfully}");
            }

            return await Result.FailAsync(ErrorMessages.DatabaseErrorOccured);
        }
    }
}
