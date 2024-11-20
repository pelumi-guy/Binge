using Binge.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Binge.Domain.Models
{
	public class AppUser : IdentityUser
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public Gender Gender { get; set; }
		public bool IsActive { get; set; }
		public string? PublicId { get; set; }
		public string? Avatar { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
		public string RefreshToken { get; set; } = String.Empty;
		public DateTime RefreshTokenExpiryTime { get; set; }
		public bool IsDeleted { get; set; }

		public string? PlanId { get; set; }
		public DateTime? PlanStartDate { get; set; }
		public DateTime? PlanEndDate { get; set; }
	}
}