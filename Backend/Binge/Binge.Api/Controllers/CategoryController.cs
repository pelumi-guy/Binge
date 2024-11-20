using AspNetCoreHero.Results;
using Binge.Application.Services.Interface;
using Binge.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Binge.Api.Controllers
{
	public class CategoryController : ApiController
	{
		private readonly ICategoryService _categoryService;

		public CategoryController(ICategoryService categoryService)
		{
			_categoryService = categoryService;
		}

		[HttpGet("movieCategories")]
		public async Task<IActionResult> GetMovieCategories()
		{
			return await Initiate(() => _categoryService.GetMovieCategoriesAsync());
		}

		[HttpGet("movieTrailer")]
		public async Task<IResult<TMDBVideo>> GetMovieTrailer(long movieId)
		{
			return await _categoryService.GetMovieTrailerAsync(movieId);
        }

        [HttpGet("tvTrailer")]
        public async Task<IResult<TMDBVideo>> GetTvTrailer(long movieId)
        {
            return await _categoryService.GetTvSeriesTrailerAsync(movieId);
        }

		[HttpGet("movie-search")]
		public async Task<IActionResult> GetSearchedMovieList(string keyword)
		{
            return await Initiate(() => _categoryService.GetSearchedMovieList(keyword));
        }
    }
}