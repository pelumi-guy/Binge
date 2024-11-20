using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.Models
{
    public class MovieCategory : BaseEntity
    {
        public int Id { get; set; }
        public Movie Movie { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
