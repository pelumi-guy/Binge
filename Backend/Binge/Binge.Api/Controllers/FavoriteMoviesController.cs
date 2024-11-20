using Binge.Application;
using Binge.Application.Services.Interface;
using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using AspNetCoreHero.Results;

namespace Binge.Api.Controllers
{
    
    public class FavoriteMoviesController : ApiController
    {
        private readonly IUserFavoriteMovieService _favoriteMovieService;
        private readonly IMovieService _movieService;
        private readonly IUserService _userService;
        private readonly BingeContext _bingeContext;
        private readonly ILogger<FavoriteMoviesController> _logger;

        public FavoriteMoviesController(IUserFavoriteMovieService favoriteMovieService, IMovieService movieService, 
            ILogger<FavoriteMoviesController> logger, BingeContext bingeContext, IUserService userService)
        {
            _favoriteMovieService = favoriteMovieService;
            _movieService = movieService;
            _logger = logger;
            _bingeContext = bingeContext;
            _userService = userService;
        }

        [HttpPost("SaveFavoriteMovie")]
        public async Task<IActionResult> SaveFavoriteMovie(SaveFavoriteMoviesVM movie)
        {
            try
            {
                // Check if the movie object is null
                if (movie == null)
                {
                    return BadRequest(Result.Fail("Movie data is null."));
                }

                // Check if the movie already exists
                bool movieExists = _bingeContext.Movies.Any(e => e.TMDBId == movie.MovieDetails.Id.ToString());

                if (movieExists)
                {
                    var userFavoriteMovie = await _bingeContext.UserFavoriteMovies
                .FirstOrDefaultAsync(e => e.UserId == movie.UserId && e.MovieId == movie.MovieDetails.Id.ToString());

                    if (userFavoriteMovie == null)
                    {
                        // Save the favorite movie
                        var favoriteMovie = await _favoriteMovieService.SaveFavoriteMovieAsync(movie);

                        // Check if both save operations were successful
                        if (favoriteMovie)
                        {
                            return Ok(Result.Success("Favorite movie saved successfully."));
                        }
                        else
                        {
                            // If save operation failed
                            return BadRequest(Result.Fail("Failed to save favorite movie."));
                        }
                    }

                    if (userFavoriteMovie != null && userFavoriteMovie.IsActive == true)
                    {
                        return Ok(Result.Success("Movie already exists."));
                    }

                    if (userFavoriteMovie != null && userFavoriteMovie.IsActive == false)
                    {
                        // Save the favorite movie
                        userFavoriteMovie.IsActive = true;
                        userFavoriteMovie.IsDeleted = false;
                        _bingeContext.UserFavoriteMovies.Update(userFavoriteMovie);
                        await _bingeContext.SaveChangesAsync();
                        return Ok(Result.Success("Favorite movie saved successfully."));
                    }

                    return Ok(Result.Success("Movie already exists.")); 
                }

                // Save the movie
                var movieResult = await _movieService.SaveMovieAsync(movie);

                // Save the favorite movie
                var favoriteResult = await _favoriteMovieService.SaveFavoriteMovieAsync(movie);

                // Check if both save operations were successful
                if (movieResult && favoriteResult)
                {
                    return Ok(Result.Success("Favorite movie saved successfully."));
                }
                else
                {
                    // If either save operation failed
                    return BadRequest(Result.Success("Failed to save favorite movie."));
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                _logger.LogError(ex, "An error occurred while saving favorite movie.");
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        [HttpGet("get-favorite-movies/{userId}")]
        public async Task<IActionResult> GetFavoriteMoviesAsync(string userId)
        {
            var result = await _favoriteMovieService.GetFavoriteMoviesAsync(userId);

            if (result.Succeeded == false)
            {
                return NotFound(Result.Fail($"User {ErrorMessages.DataNotExist}"));
            }

            return Ok(result);
        }

        [HttpDelete("remove-favorite-movie/{movieId}/{userId}")]
        public async Task<IActionResult> RemoveFavoriteMoviesAsync(string movieId, string userId)
        {
            var response = await _favoriteMovieService.RemoveFavoriteMovieAsync(movieId, userId);

            if (response.Succeeded == false && response.Message.Contains(ErrorMessages.DataNotExist))
            {
                return NotFound(Result.Fail(response.Message));
            }

            if(response.Succeeded == false && response.Message.Contains(ErrorMessages.DatabaseErrorOccured))
            {
                return StatusCode(500, Result.Fail(response.Message));
            }

            return Ok(response);
        }
    }
}
