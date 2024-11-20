using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.Models
{
    public class TMDBVideo
    {
        public string Iso639_1 { get; set; }
        public string Iso3166_1 { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
        public string Site { get; set; }
        public int Size { get; set; }
        public string Type { get; set; }
        public bool Official { get; set; }
        public DateTime PublishedAt { get; set; }
        public string Id { get; set; }
    }
}
