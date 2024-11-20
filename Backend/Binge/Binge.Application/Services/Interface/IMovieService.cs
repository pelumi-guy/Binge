using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Application.Services.Interface
{
    public interface IMovieService
    {
        Task<bool> SaveMovieAsync(SaveFavoriteMoviesVM movie);

    }
}
