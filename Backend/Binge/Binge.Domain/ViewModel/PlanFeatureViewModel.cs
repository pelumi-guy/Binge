using Binge.Domain.Enums;

namespace Binge.Domain.ViewModel
{
	public class PlanFeatureViewModel
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public decimal Cost { get; set; }
		public PlanType PlanType { get; set; }
		public List<FeatureViewModel> Features { get; set; }
	}

	public class FeatureViewModel
	{
		public string Name { get; set; }
		public string Description { get; set; }
	}
}