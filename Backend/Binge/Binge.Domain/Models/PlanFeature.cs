namespace Binge.Domain.Models
{
	public class PlanFeature : BaseEntity
	{
		public string PlanId { get; set; }
		public Plan Plan { get; set; }

		public string FeatureId { get; set; }
		public Feature Feature { get; set; }
	}
}