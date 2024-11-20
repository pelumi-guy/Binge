using Binge.Application.Services.Interface;
using Binge.Domain.Models;
using Binge.Domain.ResponseDto;
using Binge.Domain.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Binge.Api.Controllers
{
	public class AuthenticationController : ApiController
	{
		private readonly IUserService _userService;

		public AuthenticationController(IUserService userService)
		{
			_userService = userService;
		}

        [AllowAnonymous]
        [HttpPost("register")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status409Conflict)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> Register([FromBody] RegistrationModel model)
		{
			return Ok(await _userService.Register(model));
		}

        [AllowAnonymous]
        [HttpPost("register-admin")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status409Conflict)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> RegisterAdmin([FromBody] RegistrationModel model)
		{
			return Ok(await _userService.RegisterAdmin(model));
		}

        [AllowAnonymous]
        [HttpPost("Login")]
		public async Task<IActionResult> Login([FromBody] SigninModel signinModel)
		{
			var userLogin = await _userService.Signin(signinModel);
			if (userLogin == null)
			{
				return Unauthorized();
			}


			return Ok(userLogin);
		}

        [AllowAnonymous]
        [HttpPost("forgot-password")]
		public async Task<IActionResult> ForgotPassword(string email)
		{
			return Ok(await _userService.ForgotPasswordAsync(email));
		}

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
			return Ok(await _userService.ResetPasswordAsync(model));
        }

        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserVM model)
        {
            return Ok(await _userService.UpdateUser(model));
        }

        [HttpDelete("delete-user/{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            return Ok(await _userService.DeleteUser(new DeleteUserVM { Email=email}));
        }

        [HttpGet("me")]
        public async Task<IActionResult> LoadUser([FromQuery] string email)
        {
            var userProfile = await _userService.LoadUser(email);
            if (userProfile == null)
            {
                return Unauthorized();
            }


            return Ok(userProfile);
        }
    }
}