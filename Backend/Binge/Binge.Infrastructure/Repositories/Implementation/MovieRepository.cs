using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Infrastructure.Repositories.Implementation
{
    public class MovieRepository : IMovieRepository
    {
        private readonly BingeContext _context;

        public MovieRepository(BingeContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveMovieAsync(SaveFavoriteMoviesVM movie)
        {
            try
            {
                var saveMovie = new Movie
                {
                    TMDBId = movie.MovieDetails.Id.ToString(),
                    movieTitle = movie.MovieDetails.Title,
                    seriesTitle = movie.MovieDetails.Name,
                    Description = movie.MovieDetails.Overview,
                    ReleaseDate = movie.MovieDetails.Release_Date,
                    FirstAirDate = movie.MovieDetails.First_Air_Date,
                    PosterUrl = movie.MovieDetails.Poster_Path
                };

                // Add the favorite movie to the database
                _context.Movies.Add(saveMovie);
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

    }
}
