using AspNetCoreHero.Results;
using AutoMapper;
using Binge.Application.Services.Interface;
using Binge.Domain.Context;
using Binge.Domain.Enums;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PayStack.Net;
using System.Data;

namespace Binge.Application.Services.Implementation
{
	public class PlanService : IPlanService
	{
		private readonly BingeContext _context;
		private readonly IMapper _mapper;
		private readonly IConfiguration _configuration;
		private readonly UserManager<AppUser> _userManager;

		public PlanService(BingeContext context, IMapper mapper, IConfiguration configuration,
			UserManager<AppUser> userManager)
		{
			_context = context;
			_mapper = mapper;
			_configuration = configuration;
			_userManager = userManager;
		}

		public async Task<IResult<List<PlanFeatureViewModel>>> GetPlanFeatures()
		{
			return await Result<List<PlanFeatureViewModel>>.SuccessAsync(await (from plan in _context.Plans
				join planFeature in _context.PlanFeatures on plan.Id equals planFeature.PlanId
				join feature in _context.Features on planFeature.FeatureId equals feature.Id
				group feature by new { plan.Id, plan.Name, plan.Cost, plan.PlanType }
				into g
				select new PlanFeatureViewModel
				{
					Id = g.Key.Id,
					Name = g.Key.Name,
					Cost = g.Key.Cost,
					PlanType = g.Key.PlanType,
					Features = _mapper.Map<List<FeatureViewModel>>(g.ToList())
				}).ToListAsync(), "Successful");
		}

		public async Task<IResult<TransactionInitializeResponse>> Subscribe(SubscribeRequestModel request)
		{
			var plan = await _context.Plans.FirstOrDefaultAsync(x => x.Id == request.PlanId);

			if (plan == null)
				return Result<TransactionInitializeResponse>.Fail("Plan does not exist");

			var user = await _userManager.FindByIdAsync(request.UserId);

			var reference = GenerateReference.GenerateRef();

			var transactionRequest = new TransactionInitializeRequest
			{
				AmountInKobo = (int)Math.Ceiling(plan.Cost) * request.Months * 100,
				Email = user.Email,
				Reference = reference,
				Currency = "NGN",
				CallbackUrl = $"{_configuration["AppSettings:WebUrl"]}/#/verify-payment"
			};

			var api = new PayStackApi(_configuration["PayStack:Secret"]);

			var response = api.Transactions.Initialize(transactionRequest);

			if (!response.Status)
			{
				return Result<TransactionInitializeResponse>.Fail(response.Message);
			}

			var paymentDetail = new PlanPayment
			{
				PlanId = plan.Id,
				TransactionReference = reference,
				Months = request.Months,
				UserId = user.Id,
				PaymentStatus = (int)PaymentStatus.Pending,
				CreatedAt = DateTime.UtcNow
			};

			await _context.AddAsync(paymentDetail);

			await _context.SaveChangesAsync();

			return Result<TransactionInitializeResponse>.Success(response, "Payment Initialization Successful");
		}

		public async Task<IResult<TransactionVerifyResponse>> VerifySubscription(string paymentReference)
		{
			var api = new PayStackApi(_configuration["PayStack:Secret"]);

			var response = api.Transactions.Verify(paymentReference);

			if (!response.Status)
				return Result<TransactionVerifyResponse>.Fail(response.Message);

			var planPayment =
				await _context.PlanPayment.FirstOrDefaultAsync(x => x.TransactionReference == paymentReference);

			if (planPayment == null)
				return Result<TransactionVerifyResponse>.Fail("Invalid reference number");

			var plan = await _context.Plans.FirstOrDefaultAsync(x => x.Id == planPayment.PlanId);
			if (plan == null)
				return Result<TransactionVerifyResponse>.Fail("Plan not found");

			var user = await _userManager.FindByIdAsync(planPayment.UserId);
			if (user == null)
				return Result<TransactionVerifyResponse>.Fail("invalid user details");

			planPayment.PaymentStatus = PaymentStatus.Successful;

			var now = DateTime.UtcNow.Date;
			var addedDays = DateTimeHelper.ConvertMonthToDays(planPayment.Months);

			if (user.PlanId != null && user.PlanEndDate != null)
			{
                addedDays += await CheckReturnLeftDays(user.PlanId, plan,
                user.PlanEndDate);
            }
			
			user.PlanId = planPayment.PlanId;
			user.PlanStartDate = now;
			user.PlanEndDate = now.AddDays(addedDays);

			await _userManager.UpdateAsync(user);
			_context.PlanPayment.Update(planPayment);

			return Result<TransactionVerifyResponse>.Success(response, "Successful");
		}

		private async Task<int> CheckReturnLeftDays(string currentPlanId, Plan nextPlan,
			DateTime? endDate)
		{
			var currentPlan = await _context.Plans.FirstOrDefaultAsync(x => x.Id == currentPlanId);

			int remainingDays = (endDate.HasValue && endDate.Value >= DateTime.UtcNow)
				? (int)(endDate.Value - DateTime.UtcNow).TotalDays
				: 0;

			decimal remainingCost = remainingDays * currentPlan.Cost / 30;

			return (int)Math.Ceiling(remainingCost / nextPlan.Cost * 30);
		}
	}
}