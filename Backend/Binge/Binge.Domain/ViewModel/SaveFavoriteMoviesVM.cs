using Binge.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.ViewModel
{
    public class SaveFavoriteMoviesVM
    {
        public TMDBCategory? MovieDetails { get; set; }
        public string? UserId { get; set; }
    }
}
