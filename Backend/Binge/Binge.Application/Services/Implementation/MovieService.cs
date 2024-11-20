using Binge.Application.Services.Interface;
using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Application.Services.Implementation
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _repository;
        private readonly BingeContext _context;

        public MovieService(IMovieRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> SaveMovieAsync(SaveFavoriteMoviesVM movie)
        {
            // Call the data access layer to save the favorite movie
            return await _repository.SaveMovieAsync(movie);
        }

    }
}
