using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Infrastructure.Repositories.Interface
{
    public interface IMovieRepository
    {
        Task<bool> SaveMovieAsync(SaveFavoriteMoviesVM movie);
    }
}
