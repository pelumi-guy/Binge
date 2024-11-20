using Binge.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.ViewModel
{
    public class LoadUserResponseModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<TMDBCategory> FavoriteMovies { get; set; }
        public string PlanId { get; set; }
    }
}
