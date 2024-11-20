using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Domain.Models
{
   public class UserFavoriteMovie : BaseEntity
   {
        public string UserId { get; set; }
        public string MovieId { get; set; }
        public bool IsActive { get; set; }
    }
}
