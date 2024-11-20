using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;

namespace Binge.Tests.Commons.Containers
{
	public class ConfigurationAndOptions
	{
		public static WebApplicationFactoryClientOptions DefaultOptions = new()
		{
			AllowAutoRedirect = false
		};

		public static IConfigurationRoot GetConfiguration()
		{
			var configBuilder = new ConfigurationBuilder();
			configBuilder.AddInMemoryCollection(DefaultTestConfiguration());
			return configBuilder.Build();
		}

		public static Dictionary<string, string> DefaultTestConfiguration()
		{
			var defaultConfiguration = new Dictionary<string, string>
			{
				["AllowedHosts"] = "*",
				["JwtSettings:ValidAudience"] = "https://learngoal.com",
				["JwtSettings:ValidIssuer"] = "https://learngoal.com",
				["JwtSettings:SecretKey"] = "learngoalbackendconstantkeydetails",
				["JwtSettings:TokenValidityInMinutes"] = "3600",
				["Logging:LogLevel:Default"] = "Information",
				["Logging:LogLevel:Microsoft.AspNetCore"] = "Warning",
				["EmailConfiguration:From"] = "Yardapplication18@gmail.com",
				["EmailConfiguration:SmtpServer"] = "smtp.gmail.com",
				["EmailConfiguration:Port"] = "465",
				["EmailConfiguration:Username"] = "Yardapplication18@gmail.com",
				["EmailConfiguration:Password"] = "vspnauwzpyzhotoc",
				["RefreshTokenConstants:ExpiryInMinutes"] = "10080",
			};
			return defaultConfiguration;
		}
	}
}