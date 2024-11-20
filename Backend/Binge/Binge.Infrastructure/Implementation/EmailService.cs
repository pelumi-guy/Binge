using AspNetCoreHero.Results;
using Binge.Application;
using Binge.Domain.Commons;
using Binge.Domain.Models;
using Binge.Infrastructure.Interface;
using Microsoft.AspNetCore.Identity;
using MimeKit;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Binge.Infrastructure.Implementation
{
	public class EmailService : IEmailService
	{
		private readonly EmailConfiguration _emailConfig;
		private readonly UserManager<AppUser> _userManager;

		public EmailService(EmailConfiguration emailConfig, UserManager<AppUser> userManager)
		{
			_emailConfig = emailConfig;
			_userManager = userManager;
		}

		public async Task SendEmailAsync(MailModel message)
		{
			var emailMessage = CreateEmailMessage(message);
			await SendAsync(emailMessage);
		}

		public MimeMessage CreateEmailMessage(MailModel message)
		{
			var emailMessage = new MimeMessage();
			emailMessage.From.Add(new MailboxAddress("email", _emailConfig.From));
			emailMessage.To.AddRange(message.To);
			emailMessage.Subject = message.Subject;
			emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };

			return emailMessage;
		}

		public async Task SendAsync(MimeMessage message)
		{
			await Task.Run(() =>
			{
				using var client = new SmtpClient();
				try
				{
					client.Connect(_emailConfig.SmtpServer, int.Parse(_emailConfig.Port), true);
					client.AuthenticationMechanisms.Remove("XOAUTH2");
					client.Authenticate(_emailConfig.UserName, _emailConfig.Password);

					client.Send(message);
				}
				catch
				{
					throw;
				}
				finally
				{
					client.Disconnect(true);
					client.Dispose();
				}
			});
		}

		public async Task<IResult> ConfirmEmail(string userid, string token)
		{
			if (userid == null || token == null)
			{
				return Result.Fail("userid or token cannot be null");
			}

			var user = await _userManager.FindByIdAsync(userid);
			if (user == null)
			{
				return Result.Fail("Invalid User");
			}

			var result = await _userManager.ConfirmEmailAsync(user, token);
			if (result.Succeeded)
			{
				return Result.Success("Email confirmed successfully");
			}
			else
			{
				return Result.Fail("Email confirmation failed");
			}
		}
	}
}