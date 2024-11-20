using Binge.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Binge.Tests.Commons.Models
{
	public class FakeCategory
	{
		public Category CreateFakeCategory()
		{
			var category = new Category
			{
				Id = 1,
				Title = "Fake Category",
				ImageUrl = "https://example.com/image.jpg",
				Description = "This is a fake category for testing purposes.",
				ReleaseDate = DateTime.UtcNow.ToShortDateString()
			};

			return category;
		}
	}
}