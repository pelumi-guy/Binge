using Binge.Domain.Commons;
using System.Runtime.Serialization;

namespace Binge.Infrastructure.Exceptions
{
	public class ForbiddenAccessException : Exception
	{
		public ForbiddenAccessException() : base(Constants.ForbiddenMessage)
		{
		}

		public ForbiddenAccessException(string message) : base(message)
		{
		}

		protected ForbiddenAccessException(
			SerializationInfo info,
			StreamingContext context) : base(info, context)
		{
		}
	}
}