namespace Binge.Domain.ViewModel
{
	public class SubscribeRequestModel
	{
		public string UserId { get; set; }
		public string PlanId { get; set; }
		public int Months { get; set; }
	}
}