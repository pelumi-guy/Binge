using System.Text.Json.Serialization;

namespace Binge.Domain.Enums
{
	[JsonConverter(typeof(JsonStringEnumConverter))]
	public enum Gender
	{
		Male = 0,
		Female = 1,
	}
}