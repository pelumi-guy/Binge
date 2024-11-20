namespace Binge.Domain.Models
{
	public class Category : BaseEntity
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ImageUrl { get; set; }
		public string Description { get; set; }
		public string ReleaseDate { get; set; }
		public string Type { get; set; }
		public int[] Genres { get; set; }
		public ICollection<MovieCategory> MovieCategories { get; set; }
	}
}