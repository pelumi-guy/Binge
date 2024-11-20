using AspNetCoreHero.Results;
using Binge.Domain.ViewModel;
using PayStack.Net;

namespace Binge.Application.Services.Interface
{
	public interface IPlanService
	{
		Task<IResult<List<PlanFeatureViewModel>>> GetPlanFeatures();
		Task<IResult<TransactionInitializeResponse>> Subscribe(SubscribeRequestModel requset);
		Task<IResult<TransactionVerifyResponse>> VerifySubscription(string paymentReference);
	}
}