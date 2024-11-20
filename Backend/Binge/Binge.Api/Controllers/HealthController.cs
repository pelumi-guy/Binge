using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Binge.Api.Controllers
{
	[AllowAnonymous]
	public class HealthController(ILogger<HealthController> logger) : ApiController
	{
		private const string LogFilePath = "Logs/bingelogs.log";

		[HttpGet("ping")]
		public IActionResult Ping()
		{
			return Ok("Pong");
		}

		[HttpGet("readLogFile")]
		public IActionResult ReadLogFile()
		{
			try
			{
				var logContent = ReadLogContent();
				return Ok(logContent);
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "Error reading log file.");
				return StatusCode(500, "Internal Server Error");
			}
		}

		[HttpDelete("clearLogFile")]
		public IActionResult ClearLogFile()
		{
			try
			{
				ClearLogContent();
				logger.LogInformation("Log file content cleared.");
				return Ok("Log file content cleared.");
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "Error clearing log file content.");
				return StatusCode(500, "Internal Server Error");
			}
		}

		private string ReadLogContent()
		{
			var logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, LogFilePath);

			return System.IO.File.Exists(logFilePath) ? System.IO.File.ReadAllText(logFilePath) : "Log file not found.";
		}

		private void ClearLogContent()
		{
			var logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, LogFilePath);

			if (System.IO.File.Exists(logFilePath))
			{
				System.IO.File.WriteAllText(logFilePath, string.Empty);
			}
		}
	}
}