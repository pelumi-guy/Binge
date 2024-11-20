using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.Models
{
    public class TMDBVideoResponse
    {
        public int Id { get; set; }
        public List<TMDBVideo> Results { get; set; }
    }
}
