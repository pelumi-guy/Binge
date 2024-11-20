using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Binge.Tests.Commons.Helper
{
	public class ClaimsImplementation
	{
		public static List<Claim> GetClaims(IList<string> userRoles, string userName)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, userName),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			};
			claims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));

			return claims;
		}
	}
}