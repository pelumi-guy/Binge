using Binge.Application.Services.Interface;
using Binge.Domain.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Binge.Api.Controllers
{
	public class PlanController : ApiController
	{
		private readonly IPlanService _planService;

		public PlanController(IPlanService planService)
		{
			_planService = planService;
		}

		[HttpGet(nameof(GetPlanFeatures))]
		public async Task<IActionResult> GetPlanFeatures()
		{
			return await Initiate(() => _planService.GetPlanFeatures());
		}

		[HttpPost(nameof(Subscribe))]
		public async Task<IActionResult> Subscribe(SubscribeRequestModel request)
		{
			return await Initiate(() => _planService.Subscribe(request));
		}

		[HttpPatch("VerifySubscription/{reference}")]
		public async Task<IActionResult> VerifySubscription(string reference)
		{
			return await Initiate(() => _planService.VerifySubscription(reference));
		}
	}
}