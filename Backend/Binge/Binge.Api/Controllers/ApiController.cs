using AspNetCoreHero.Results;
using Binge.Domain.Commons;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NLog;
using System;
using System.Net;
using IResult = AspNetCoreHero.Results.IResult;

namespace Binge.Api.Controllers
{
	[Authorize(AuthenticationSchemes = "Bearer")]
	[Route("api/v1/[controller]")]
	[ApiController]
	public class ApiController : ControllerBase
	{
		private IMediator _mediator;
		private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
		protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

		private IActionResult BadRequestResponse(string message)
		{
			return BadRequest(Result.Fail(message));
		}

		private IActionResult ForbiddenResponse(string message)
		{
			return BadRequest(Result.Fail(message));
		}

		private IActionResult ServerErrorResponse(string message)
		{
			return StatusCode((int)HttpStatusCode.InternalServerError, Result.Fail(message));
		}

		protected async Task<IActionResult> Initiate(
			Func<Task<IResult<Dictionary<string, List<Category>>>>> action)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest(GetErrorsAsList(ModelState));

				var result = await action.Invoke();
				if (result.Succeeded)
					return Ok(result);

				return BadRequest(result);
			}
			catch (ArgumentException ex)
			{
				Logger.Error(ex);
				return BadRequestResponse(ex.Message);
			}
			catch (ValidationException ex)
			{
				Logger.Error(ex);
				return BadRequestResponse(string.Join('\n', ex.Errors));
			}
			catch (ForbiddenAccessException ex)
			{
				Logger.Error(ex);
				return ForbiddenResponse(Constants.ForbiddenMessage);
			}
			catch (Exception ex)
			{
				Logger.Error(ex);
				return ServerErrorResponse(Constants.InternalServerErrorMessage);
			}
		}

		protected async Task<IActionResult> Initiate<TOut>(Func<Task<IResult<TOut>>> action)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest(GetErrorsAsList(ModelState));

				var result = await action.Invoke();
				if (result.Succeeded)
					return Ok(result);

				return BadRequest(result);
			}
			catch (ArgumentException ex)
			{
				Logger.Error(ex);
				return BadRequestResponse(ex.Message);
			}
			catch (ValidationException ex)
			{
				Logger.Error(ex);
				return BadRequestResponse(string.Join('\n', ex.Errors));
			}
			catch (ForbiddenAccessException ex)
			{
				Logger.Error(ex);
				return ForbiddenResponse(Constants.ForbiddenMessage);
			}
			catch (Exception ex)
			{
				Logger.Error(ex);
				return ServerErrorResponse(Constants.InternalServerErrorMessage);
			}
		}

		protected async Task<IActionResult> Initiate(Func<Task<IResult>> action)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest(GetErrorsAsList(ModelState));

				var result = await action.Invoke();
				if (result.Succeeded)
					return Ok(result);

				return BadRequest(result);
			}
			catch (ArgumentException ex)
			{
				Logger.Error(ex);
				return BadRequestResponse(ex.Message);
			}
			catch (ValidationException ex)
			{
				Logger.Error(ex);
				return BadRequestResponse(string.Join('\n', ex.Errors));
			}
			catch (ForbiddenAccessException ex)
			{
				Logger.Error(ex);
				return ForbiddenResponse(Constants.ForbiddenMessage);
			}
			catch (Exception ex)
			{
				Logger.Error(ex);
				return ServerErrorResponse(Constants.InternalServerErrorMessage);
			}
		}

		private static List<string> GetErrorsAsList(ModelStateDictionary? modelState)
		{
			if (modelState == null || !modelState.Values.Any())
				return [];

			IList<string> allErrors = modelState.Values.SelectMany(v => v.Errors.Select(b => b.ErrorMessage)).ToList();

			List<string> err = allErrors.Where(error => !string.IsNullOrEmpty(error)).ToList();

			if (err.Count == 0)
				err = modelState.Values.SelectMany(v => v.Errors.Select(b => b.Exception?.Message)).ToList();

			return err;
		}
	}
}