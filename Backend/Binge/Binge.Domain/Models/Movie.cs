using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.Models
{
    public class Movie : BaseEntity
    {
        public int Id { get; set; }
        public string TMDBId { get; set; }
        public string movieTitle { get; set; }
        public string seriesTitle { get; set; }
        public string Description { get; set; }
        public string ReleaseDate { get; set; }
        public string FirstAirDate { get; set; }
        public string? DownloadUrl { get; set; }
        public string PosterUrl { get; set; } // Movie poster image url

        public ICollection<Category> Categories { get; set;}
    }
}
