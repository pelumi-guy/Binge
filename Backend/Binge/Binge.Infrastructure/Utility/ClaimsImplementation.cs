using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Binge.Infrastructure.Utility
{
	public static class ClaimsImplementation
	{
		public static List<Claim> GetClaims(IList<string> userRoles, string userName)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, userName),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			};

			foreach (var userRole in userRoles)
			{
				claims.Add(new Claim(ClaimTypes.Role, userRole));
			}

			return claims;
		}
	}
}