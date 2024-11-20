using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Application
{
	public class EmailConfiguration
	{
		public string From { get; set; }
		public string SmtpServer { get; set; }
		public string Port { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
	}
}