using AspNetCoreHero.Results;
using Binge.Domain.Models;
using Binge.Domain.ResponseDto;
using Binge.Domain.ViewModel;
using Microsoft.AspNetCore.Identity;

namespace Binge.Application.Services.Interface
{
	public interface IUserService
	{
		Task<AppUser> FindUser(string email);
		Task<IdentityResult> RegisterUser(string password, AppUser user);
		Task<IdentityResult> CreateRole(IdentityRole role);

		Task<bool> CheckRole(string roleName);

		Task<AppUser> CreateUserFromModel(RegistrationModel model);

		string GetErrorsFromIdentityResult(IdentityResult result);

		Task AssignRolesToUser(AppUser user);

		Task<IdentityResult> AddToRole(AppUser user, string role);

		Task<bool> CheckPassword(AppUser user, string password);

		Task<IList<string>> GetRoles(AppUser user);

		Task<IResult<SignInResponseModel>> Signin(SigninModel request);


		Task<List<AppUser>> GetRegisteredUsers();

		Task<AppUser> GetUserById(string userId);
		// Task<bool> UserExistAsync(int AppUserId);
		Task <IResult<object>> UpdateUser(UpdateUserVM model);
		Task<IResult> DeleteUser(DeleteUserVM model);

		Task<IResult> ConfirmEmail(string email);
		Task<IResult<CreateUserDto>> Register(RegistrationModel model);
		Task<IResult> RegisterAdmin(RegistrationModel model);
		Task<IResult> ForgotPasswordAsync(string email);
        Task<IResult> ResetPasswordAsync(ResetPasswordModel model);
		Task<IResult<LoadUserResponseModel>> LoadUser(string email);

    }
}