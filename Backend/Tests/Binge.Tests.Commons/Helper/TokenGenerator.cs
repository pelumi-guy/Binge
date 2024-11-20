using Binge.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Binge.Tests.Commons.Helper
{
	public class TokenGenerator
	{
		public static async Task<string> GenerateUserToken(AppUser user, UserManager<AppUser> userManager,
			IConfiguration configuration)
		{
			var authClaims = new List<Claim>
			{
				new Claim("Id", user.Id),
				new Claim("Email", user.Email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			if (!string.IsNullOrWhiteSpace(user.FirstName))
				authClaims.Add(new Claim("FirstName", user.FirstName));

			if (!string.IsNullOrWhiteSpace(user.LastName))
				authClaims.Add(new Claim("LastName", user.LastName));

			if (!string.IsNullOrWhiteSpace(user.PhoneNumber))
				authClaims.Add(new Claim("PhoneNumber", user.PhoneNumber));

			//Gets the roles of the logged in user and adds it to Claims
			var roles = await userManager.GetRolesAsync(user);
			authClaims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
			authClaims.AddRange(roles.Select(role => new Claim("Role", role)));

			var ccc = configuration["JwtSettings:SecretKey"];


			var signingKey =
				new SymmetricSecurityKey(
					Encoding.UTF8.GetBytes(configuration["JwtSettings:SecretKey"] ?? string.Empty));

			int.TryParse(configuration["JwtSettings:TokenValidityInMinutes"], out var tokenValidityInMinutes);

			// Specifying JWTSecurityToken Parameters
			var token = new JwtSecurityToken
			(audience: configuration["JwtSettings:ValidAudience"],
				issuer: configuration["JwtSettings:ValidIssuer"],
				claims: authClaims,
				expires: DateTime.Now.AddMinutes(tokenValidityInMinutes),
				signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256));

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}