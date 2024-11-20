using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Binge.Api.Extensions
{
	public static class AuthenticationServiceExtension
	{
		public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.RequireHttpsMetadata = false;
				options.SaveToken = true;
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = configuration["JwtSettings:ValidIssuer"],
					ValidAudience = configuration["JwtSettings:ValidAudience"],
					IssuerSigningKey =
						new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:SecretKey"])),
					ClockSkew = TimeSpan.Zero
				};
			});
		}
	}
}