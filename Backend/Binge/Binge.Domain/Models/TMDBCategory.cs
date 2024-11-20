using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.Models
{
	public class TMDBCategory
	{
		public int Id { get; set; }
		public string? Title { get; set; } // title of movies
		public string? Name { get; set; } //title of tv series
		public string? Overview { get; set; }
		public string? Poster_Path { get; set; }
		public string? Release_Date { get; set; } // Release date of movie 
		public string? First_Air_Date { get; set; } // Release date for tv series
		public int[] Genre_Ids { get; set; }

    }
}