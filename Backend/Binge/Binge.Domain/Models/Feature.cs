namespace Binge.Domain.Models
{
	public class Feature : BaseEntity
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public List<PlanFeature> PlanFeatures { get; set; }
	}
}