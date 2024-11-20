using AspNetCoreHero.Results;
using AutoMapper;
using Binge.Application.Services.Interface;
using Binge.Domain.Commons;
using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Domain.ResponseDto;
using Binge.Domain.ViewModel;
using Binge.Infrastructure.Interface;
using Binge.Infrastructure.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text;
using Microsoft.Extensions.Logging;
using Binge.Infrastructure.Repositories.Interface;
using Newtonsoft.Json.Linq;

namespace Binge.Application.Services.Implementation
{
	public class UserService : IUserService
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;
		private readonly BingeContext _context;
		private readonly IMapper _mapper;
		private readonly IEmailService _emailService;
		private readonly ILogger<UserService> _logger;
		private readonly IUserFavoriteMoviesRepository _userFavoriteMoviesRepository;

		public UserService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,
			IConfiguration configuration, BingeContext context, IMapper mapper, IEmailService emailService,
			ILogger<UserService> logger, IUserFavoriteMoviesRepository userFavoriteMoviesRepository)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_configuration = configuration;
			_context = context;
			_mapper = mapper;
			_emailService = emailService;
			_logger = logger;
			_userFavoriteMoviesRepository = userFavoriteMoviesRepository;
		}

		public async Task<bool> CheckPassword(AppUser user, string password)
		{
			var isValid = await _userManager.CheckPasswordAsync(user, password);

			return isValid;
		}

		public async Task<IList<string>> GetRoles(AppUser user)
		{
			return await _userManager.GetRolesAsync(user);
		}

		public async Task<IResult<object>> RegisterToken(AppUser user, RegistrationModel request)
		{
			var userExist = FindUser(user.Email);
			if (userExist != null && await _userManager.CheckPasswordAsync(user, request.Password))
			{
				var userRoles = await _userManager.GetRolesAsync(user);

				var claim = ClaimsImplementation.GetClaims(userRoles, user.UserName);
				//JWT
				string token = await TokenGenerator.GenerateUserToken(user, _userManager, _configuration);

				var userData = FindUser(user.Email);

				//return token;

				var data = new
				{
					user = userData.Result,
					token
				};

				return Result<object>.Success(data);
			}

			return Result<object>.Fail("Registration failed");
		}

		public async Task<IResult<SignInResponseModel>> Signin(SigninModel request)
		{
			// Find the user by email
			var user = await _userManager.FindByEmailAsync(request.Email);

			if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
			{
				// Return Unauthorized if user not found or password is incorrect
				return Result<SignInResponseModel>.Fail("Invalid email or password.");
			}


			// Get user roles
			var userRoles = await _userManager.GetRolesAsync(user);

			// Generate claims
			var claims = ClaimsImplementation.GetClaims(userRoles, user.UserName);

			// Generate JWT token
			string token = await TokenGenerator.GenerateUserToken(user, _userManager, _configuration);

			var faveMovies = await _userFavoriteMoviesRepository.GetFavouriteMoviesAsync(user.Id);

			// Construct response data
			var responseData = new SignInResponseModel()
			{
				Id = user.Id,
				FirstName = user.FirstName,
				LastName = user.LastName,
				Email = user.Email,
				Token = token,
				FavoriteMovies = faveMovies,
				PlanId = user.PlanId
			};

			// Return success response with user data and token
			return Result<SignInResponseModel>.Success(responseData);
		}

		public async Task<AppUser> FindUser(string email)
		{
			var user = await _userManager.FindByEmailAsync(email);

			var userToReturn = _mapper.Map<AppUser>(user);

			return userToReturn;
		}

		public async Task<IdentityResult> CreateRole(IdentityRole role)
		{
			return await _roleManager.CreateAsync(role);
		}

		public async Task<IdentityResult> AddToRole(AppUser user, string roleName)
		{
			return await _userManager.AddToRoleAsync(user, "Admin");
		}

		public string GetErrorsFromIdentityResult(IdentityResult result)
		{
			string errors = string.Empty;

			foreach (var error in result.Errors)
			{
				errors += error.Description;
				errors += "@";
			}

			errors = errors.Replace("@", System.Environment.NewLine);

			return errors;
		}

		public async Task AssignRolesToUser(AppUser user)
		{
			foreach (var roleName in new[] { UserRoles.Admin, UserRoles.User })
			{
				if (!await CheckRole(roleName.ToString()))
				{
					await CreateRole(new IdentityRole(roleName));
				}
			}

			if (await CheckRole(UserRoles.Admin))
			{
				await AddToRole(user, UserRoles.Admin);
			}
		}

		public async Task<AppUser> CreateUserFromModel(RegistrationModel model)
		{
			var appUser = new AppUser()
			{
				FirstName = model.FirstName,
				LastName = model.LastName,
				PhoneNumber = model.PhoneNumber,
				Email = model.Email,
				UserName = model.Email,
			};
			return appUser;
		}

		public async Task<AppUser> GetUserById(string userId)
		{
			//var userIdAsString = Id.ToString();
			var user = await _userManager.FindByIdAsync(userId);
			return user;
		}

		public async Task<List<AppUser>> GetRegisteredUsers()
		{
			return await _userManager.Users.ToListAsync();
		}

		public async Task<IdentityResult> RegisterUser(string password, AppUser user)
		{
			return await _userManager.CreateAsync(user, password);
		}

		public async Task<bool> CheckRole(string roleName)
		{
			return await _roleManager.RoleExistsAsync(roleName);
		}

		public async Task<IResult> ConfirmEmail(string email)
		{
			var user = await _userManager.FindByEmailAsync(email);
			if (user == null)
			{
				return Result.Fail("User does not exist");
			}

			var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
			var encodedEmailToken = Encoding.UTF8.GetBytes(confirmEmailToken);
			var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);
			string url =
				$"{_configuration["AppUrl"]}/api/authentication/confirmemail?userid={user.Id}&token={validEmailToken}";

			var message = new MailModel(new string[] { user.Email! }, "Confirmation email link",
				$"<h1>Hi, Welcome to Binge Application</h1>"
				+ $"<p>Please confirm your email by <a href='{url}'> Click here </a></p>");
			await _emailService.SendEmailAsync(message);
			return Result.Success("Confirmation email sent sucessfully");
		}

		public async Task<IResult<CreateUserDto>> Register(RegistrationModel model)
		{
			if (model.ConfirmPassword != model.Password)
			{
				return Result<CreateUserDto>.Fail("Passwords does not match!");
			}

			var userExists = await FindUser(model.Email);

			if (userExists != null)
				return Result<CreateUserDto>.Fail("User already exist!");

			AppUser user = await CreateUserFromModel(model);

			var result = await RegisterUser(model.Password, user);

			if (!result.Succeeded)
			{
				var errors = GetErrorsFromIdentityResult(result);
				_logger.LogError(errors);
				return Result<CreateUserDto>.Fail("Unable to register user!");
			}

			await ConfirmEmail(model.Email);

			var createUserDto = new CreateUserDto
			{
				Id = user.Id,
				FirstName = user.FirstName,
				LastName = user.LastName,
			};

			return Result<CreateUserDto>.Success(createUserDto);
		}

		public async Task<IResult> RegisterAdmin(RegistrationModel model)
		{
			if (model.ConfirmPassword != model.Password)
			{
				return Result.Fail("Passwords mismatch!");
			}

			var userExists = await FindUser(model.Email);

			if (userExists != null)
				return Result.Fail("User does not exist!");
			AppUser user = await CreateUserFromModel(model);

			var result = await RegisterUser(model.Password, user);

			if (!result.Succeeded)
			{
				string errors = GetErrorsFromIdentityResult(result);

				return Result.Fail("Unable to register Admin!");
			}

			await AssignRolesToUser(user);

			return Result.Success();
		}

		public async Task<IResult> ForgotPasswordAsync(string email)
		{
			// Gets the User by email provided by the user
			var user = await _userManager.FindByEmailAsync(email);

			// Returns null if user does not exist
			if (user == null)
			{
				return Result.Fail("User does not exist");
			}

			// Generates token to reset password
			var token = await _userManager.GeneratePasswordResetTokenAsync(user);

			// Generates the url for the user needs in order to reset the password
			//string url = $"{_configuration["AppUrl"]}/reset-password?email={email}&token={token}";
			string? apiWebUrl = _configuration.GetSection("AppSettings")["WebUrl"];
            string url = $"{apiWebUrl}/#/reset-password?email={email}&token={token}";

            // Subject and body of the email to be sent to the user
            var message = new MailModel(new string[] { user.Email! }, "Reset your Password",
				"<h1> Please follow the instructions to reset your password</h1>" +
				$"<p>To reset your password <a href='{url}'>Click here</a></p>");

			// Send an email to the user
			await _emailService.SendEmailAsync(message);

			// Shows the code ran successfully
			return Result.Success("Reset Url password has been set successfully");
		}

		public async Task<IResult> ResetPasswordAsync(ResetPasswordModel model)
		{
			// checks if the email is in the url 
			var user = await _userManager.FindByEmailAsync(model.Email);

			// Returns null if the user does not exist
			if (user == null)
			{
				return Result.Fail("User does not exist");
			}

			// confirms the new password is confirmed
			if (model.NewPassword != model.ConfirmPassword)
			{
				return Result.Fail("Password doesn't match");
			}

			// Resets the password
			var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

			// Is returned if the reset doesn't work
			if (!result.Succeeded)
			{
				return Result.Fail("Could not reset password");
			}

			// shows the code did it's job!
			return Result.Success("Password has been changed ");
		}

		public async Task<IResult<LoadUserResponseModel>> LoadUser(string email)
		{
			// Find the user by email
			var user = await _userManager.FindByEmailAsync(email);

			if (user == null)
			{
				// Return Unauthorized if user not found or password is incorrect
				return Result<LoadUserResponseModel>.Fail("Invalid email or password.");
			}

			var faveMovies = await _userFavoriteMoviesRepository.GetFavouriteMoviesAsync(user.Id);

			// Construct response data
			var responseData = new LoadUserResponseModel()
			{
				Id = user.Id,
				FirstName = user.FirstName,
				LastName = user.LastName,
				Email = user.Email,
				FavoriteMovies = faveMovies,
                PlanId = user.PlanId
            };

			// Return success response with user data and token
			return Result<LoadUserResponseModel>.Success(responseData);
		}

		public async Task<IResult<object>> UpdateUser(UpdateUserVM model)
		{
			var user = await _userManager.FindByEmailAsync(model.Email);

			if (user == null)
			{
				return Result<CreateUserDto>.Fail("User not found");
			}

			user.FirstName = model.FirstName;
			await _userManager.UpdateAsync(user);
			// var userToReturn = _mapper.Map<CreateUserDto>(user);

			var userToReturn = new
			{
				user.FirstName,
				user.LastName,
				user.Email,
				user.Id
			};
			return Result<object>.Success(userToReturn);
		}


		public async Task<IResult> DeleteUser( DeleteUserVM model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Result.Fail("User not found");
            }
           // user.IsDeleted = true;
            await _userManager.DeleteAsync(user);

            return Result.Success("User successfully deleted");
        }
    }

}