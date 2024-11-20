using Binge.Domain.Enums;

namespace Binge.Domain.Models
{
	public class Plan : BaseEntity
	{
		public string Name { get; set; }
		public decimal Cost { get; set; }
		public PlanType PlanType { get; set; }
		public List<PlanFeature> PlanFeatures { get; set; }
	}
}