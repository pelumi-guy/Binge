namespace Binge.Infrastructure.Utility
{
	public class DateTimeHelper
	{
		public static int ConvertMonthToDays(int months)
		{
			return (int)TimeSpan.FromDays(30 * months).TotalDays;
		}
	}
}