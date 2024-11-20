namespace Binge.Domain.ViewModel
{
	public class InitiatePaymentResponse
	{
		public bool Status { get; set; }
		public string AuthUrl { get; set; }
		public string Message { get; set; }
	}
}