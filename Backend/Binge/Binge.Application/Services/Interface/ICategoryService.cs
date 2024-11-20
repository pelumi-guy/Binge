using AspNetCoreHero.Results;
using Binge.Domain.Models;
using RestSharp;

namespace Binge.Application.Services.Interface
{
	public interface ICategoryService
	{
		Task<IResult<Dictionary<string, List<Category>>>> GetMovieCategoriesAsync();
		Task<List<Category>> GetTrendingMoviesAsync();
		Task<List<Category>> GetPopularTVSeriesAsync();
        Task<IResult<TMDBVideo>> GetMovieTrailerAsync(long movieId);
		Task<IResult<TMDBVideo>> GetTvSeriesTrailerAsync(long tvId);
		Task<IResult<List<Category>>> GetSearchedMovieList(string keyword);

    }
}