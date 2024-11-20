using Binge.Domain.Models;

namespace Binge.Domain.ViewModel
{
	public class SignInResponseModel
	{
		public string Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string Token { get; set; }
        public string PlanId { get; set; }
        public List<TMDBCategory> FavoriteMovies { get; set; }
	}
}