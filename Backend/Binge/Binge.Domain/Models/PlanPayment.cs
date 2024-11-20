using Binge.Domain.Enums;

namespace Binge.Domain.Models
{
	public class PlanPayment : BaseEntity
	{
		public string PlanId { get; set; }
		public string TransactionReference { get; set; }
		public string UserId { get; set; }
		public int? OrganizationId { get; set; }
		public int Months { get; set; }
		public PaymentStatus PaymentStatus { get; set; }
	}
}