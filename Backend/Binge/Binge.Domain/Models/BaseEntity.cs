using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Binge.Domain.Models
{
	public class BaseEntity
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key]
		public string Id { get; set; }

		//public string? Country { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
		public bool IsDeleted { get; set; }
		public bool IsArchived { get; set; }
	}
}