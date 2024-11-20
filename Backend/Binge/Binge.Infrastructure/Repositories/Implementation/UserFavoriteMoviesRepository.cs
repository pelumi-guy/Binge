using AspNetCoreHero.Results;
using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO.MemoryMappedFiles;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Infrastructure.Repositories.Implementation
{
    public class UserFavoriteMoviesRepository : IUserFavoriteMoviesRepository
    {
        private readonly BingeContext _context;

        public UserFavoriteMoviesRepository(BingeContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveFavoriteMovieAsync(SaveFavoriteMoviesVM movie)
        {
            try
            {
                
                // Create a new UserFavoriteMovie object
                var favoriteMovie = new UserFavoriteMovie
                {
                    UserId = movie.UserId,
                    MovieId = movie.MovieDetails.Id.ToString(),
                    IsActive = true
                };

                // Add the favorite movie to the database
                _context.UserFavoriteMovies.Add(favoriteMovie);
                await _context.SaveChangesAsync();

                // Return true if the operation was successful
                return true;
            }
            catch (Exception ex)
            {
              
                // Return false if the operation failed
                return false;
            }
        }

        public async Task<List<TMDBCategory>> GetFavouriteMoviesAsync(string id)
        {
            var result = from userFave in _context.UserFavoriteMovies
                         join mvie in _context.Movies on userFave.MovieId equals mvie.TMDBId
                         where userFave.UserId == id && userFave.IsActive == true
                         select new TMDBCategory
                         {
                             Id = int.Parse(userFave.MovieId),
                             Title = mvie.movieTitle,
                             Name = mvie.seriesTitle,
                             Overview = mvie.Description,
                             Poster_Path = mvie.PosterUrl,
                             Release_Date = mvie.ReleaseDate,
                             First_Air_Date = mvie.FirstAirDate
                         };

           return await result.ToListAsync();
        }

        public async Task<UserFavoriteMovie?> GetUserFaveMovie(string movieId, string userId)
        {
            var userMovie =  _context.UserFavoriteMovies.FirstOrDefault(uMovie => uMovie.UserId == userId 
            && uMovie.MovieId == movieId && uMovie.IsActive == true);

            if (userMovie == null)
            {
                return null;
            }

            return userMovie;
        }

        private async Task<bool> CheckMovieExist(string movieId)
        {
            return await _context.Movies.AnyAsync(mvie => mvie.TMDBId == movieId);
        }

        public async Task<int> RemoveFavoriteMovieAsync(UserFavoriteMovie userFavoriteMovie)
        {
            userFavoriteMovie.IsDeleted = true;
            userFavoriteMovie.IsActive = false;

            _context.UserFavoriteMovies.Update(userFavoriteMovie);
            int updatedCount = await _context.SaveChangesAsync();

            return updatedCount;

        }
    }
}
