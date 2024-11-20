using AspNetCoreHero.Results;
using Binge.Domain.Commons;
using MimeKit;

namespace Binge.Infrastructure.Interface
{
	public interface IEmailService
	{
		Task SendEmailAsync(MailModel message);
		MimeMessage CreateEmailMessage(MailModel message);
		Task SendAsync(MimeMessage message);
		Task<IResult> ConfirmEmail(string userid, string token);
	}
}