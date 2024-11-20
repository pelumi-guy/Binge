namespace Binge.Infrastructure.Utility
{
	public class GenerateReference
	{
		public static string GenerateRef()
		{
			return TokenConverter.EncodeToken(Guid.NewGuid().ToString() + Guid.NewGuid()).Substring(0, 16);
		}
	}
}