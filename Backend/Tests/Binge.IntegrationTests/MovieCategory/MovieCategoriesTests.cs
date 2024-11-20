using AspNetCoreHero.Results;
using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Tests.Commons.Containers;
using Binge.Tests.Commons.Fixtures;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;

namespace Binge.IntegrationTests.MovieCategory
{
	[Collection("Reg Collection 1")]
	public class MovieCategoriesTests
	{
		private const string MovieCategoriesUrlPath = "api/v1/Category/movieCategories";
		private readonly DatabaseFixture _fixture;

		public MovieCategoriesTests()
		{
			_fixture = new DatabaseFixture();
			_fixture.MockServer.Reset();
		}

		[Fact]
		public async Task ShouldRetrieveMovieCategories_Success()
		{
			// Act
			_ = await _fixture.FakeUserLogin();
			var response = await _fixture.Client.GetAsync(MovieCategoriesUrlPath);

			// Assert
			response.StatusCode.Should().Be(HttpStatusCode.OK);

			var categories = await response.Content.ReadFromJsonAsync<Result<Dictionary<string, List<Category>>>>();
			var resultObject = new { X = categories?.Data["trendingMovies"], Y = categories?.Data["popularTvSeries"] };
			categories.Should().NotBeNull();
			resultObject.X.Should().NotBeNull();
			resultObject.Y.Should().NotBeNull();
		}

		private Exception NullReferenceException()
		{
			throw new NotImplementedException();
		}

		public void Dispose()
		{
			_fixture.Dispose();
			GC.SuppressFinalize(this);
		}
	}
}