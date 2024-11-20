using AspNetCoreHero.Results;
using AutoMapper;
using Binge.Application.Services.Interface;
using Binge.Domain.Models;
using Binge.Infrastructure.Repositories.Interface;
using Newtonsoft.Json;
using RestSharp;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace Binge.Application.Services.Implementation
{
    public class CategoryService : ICategoryService
    {
        private readonly IRestClient _restClient;
        private readonly string _apiKey;


        public CategoryService(IRestClient restClient, string apiKey)
        {
            _restClient = restClient;
            _apiKey = apiKey;
        }

        public async Task<IResult<Dictionary<string, List<Category>>>> GetMovieCategoriesAsync()
        {
            var trendingMoviesTask = await GetTrendingMoviesAsync();
            var popularTvSeriesTask = await GetPopularTVSeriesAsync();

            var result = new Dictionary<string, List<Category>>()
            {
                { "trendingMovies", trendingMoviesTask },
                { "popularTvSeries", popularTvSeriesTask },
            };

            return await Result<Dictionary<string, List<Category>>>.SuccessAsync(result);
        }


        public async Task<List<Category>> GetTrendingMoviesAsync()
        {
            var request = new RestRequest("trending/movie/day", Method.Get);
            request.AddParameter("api_key", "28dda9f76d76f128b47831768bc9a103");

            var response = await _restClient.ExecuteAsync<TMDBCategoriesResponse>(request);

            if (!response.IsSuccessful)
            {
                throw new Exception($"Failed to fetch trending movies. Status code: {response.StatusCode}");
            }

            var tmdbCategories = response.Data.Results;

            return ConvertToMovieCategories(tmdbCategories);
        }

        public async Task<List<Category>> GetPopularTVSeriesAsync()
        {
            var request = new RestRequest("trending/tv/day", Method.Get);
            request.AddParameter("api_key", "28dda9f76d76f128b47831768bc9a103");

            var response = await _restClient.ExecuteAsync<TMDBCategoriesResponse>(request);

            if (!response.IsSuccessful)
            {
                throw new Exception($"Failed to fetch popular TV series. Status code: {response.StatusCode}");
            }

            var tmdbCategories = response.Data.Results;

            return tmdbCategories.Select(tvSeries => new Category
            {
                Id = tvSeries.Id,
                Title = tvSeries.Name,
                ImageUrl = tvSeries.Poster_Path,
                ReleaseDate = tvSeries.First_Air_Date,
                Description = tvSeries.Overview,
                Genres = tvSeries.Genre_Ids,
                Type = "tv"
            })
                .ToList();
        }

        public async Task<IResult<TMDBVideo>> GetMovieTrailerAsync(long movieId)
        {
            string api_url = $"movie/{movieId}/videos";
            var request = new RestRequest(api_url, Method.Get);
            request.AddParameter("language", "en-US");
            request.AddParameter("api_key", "28dda9f76d76f128b47831768bc9a103");

            var response = await _restClient.ExecuteAsync<TMDBVideoResponse>(request);

            if (!response.IsSuccessful)
            {
                //throw new Exception($"Failed to fetch movie videos. Status code: {response.StatusCode}");
                return Result<TMDBVideo>.Fail($"Failed to fetch movie videos. movieId: {movieId}, response: {response.StatusCode}");

            }

            var movieVideos = response.Data.Results;

            foreach (var video in movieVideos)
            {
                if (video.Type == "Trailer")
                {
                    return Result<TMDBVideo>.Success(video);
                }
            }

            return Result<TMDBVideo>.Fail("Trailer not found");
        }

        public async Task<IResult<TMDBVideo>> GetTvSeriesTrailerAsync(long tvId)
        {
            string api_url = $"tv/{tvId}/videos";
            var request = new RestRequest(api_url, Method.Get);
            request.AddParameter("language", "en-US");
            request.AddParameter("api_key", "28dda9f76d76f128b47831768bc9a103");

            var response = await _restClient.ExecuteAsync<TMDBVideoResponse>(request);

            if (!response.IsSuccessful)
            {
                //throw new Exception($"Failed to fetch movie videos. Status code: {response.StatusCode}");
                return Result<TMDBVideo>.Fail($"Failed to fetch movie videos. movieId: {tvId}, response: {response.StatusCode}");

            }

            var movieVideos = response.Data.Results;

            foreach (var video in movieVideos)
            {
                if (video.Type == "Trailer" || video.Type == "Clip" || video.Type == "Opening Credits")
                {
                    return Result<TMDBVideo>.Success(video);
                }
            }

            return Result<TMDBVideo>.Fail("Trailer not found");
        }

        public async Task<IResult<List<Category>>> GetSearchedMovieList(string keyword)
        {
            var request = new RestRequest("search/movie", Method.Get);
            request.AddQueryParameter("query", keyword);
            request.AddQueryParameter("api_key", "28dda9f76d76f128b47831768bc9a103");

            var response = await _restClient.ExecuteAsync<TMDBCategoriesResponse>(request);

            if (!response.IsSuccessful)
            {
                throw new Exception($"Failed to fetch trending movies. Status code: {response.StatusCode}");
            }

            var moviesToReturn = ConvertToMovieCategories(response.Data.Results);

            return await Result<List<Category>>.SuccessAsync(moviesToReturn);
        }

        private List<Category> ConvertToMovieCategories(List<TMDBCategory> movieFromTMDB)
        {
            return movieFromTMDB.Select(movie => new Category
            {
                Id = movie.Id,
                Title = movie.Title,
                ImageUrl = movie.Poster_Path,
                ReleaseDate = movie.Release_Date,
                Description = movie.Overview,
                Genres = movie.Genre_Ids,
                Type = "movie"

            }).ToList();
        }

    }
}