using System;
using System.Diagnostics;
using Binge.Domain.Context;
using Binge.Domain.Enums;
using Binge.Domain.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NLog;
using Org.BouncyCastle.Bcpg.Sig;

namespace Binge.Infrastructure.Seed
{
	public class Seeder
	{
		private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

		public static async Task SeedData(IApplicationBuilder app)
		{
			using var serviceScope = app.ApplicationServices.CreateScope();
			await RunSeed(
				serviceScope.ServiceProvider.GetService<UserManager<AppUser>>(),
				serviceScope.ServiceProvider.GetService<BingeContext>(),
				serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>());
		}

		private static async Task RunSeed(UserManager<AppUser>? userManager, BingeContext? context,
			RoleManager<IdentityRole>? roleManager)
		{
			try
			{
				if (context != null && userManager != null && roleManager != null)
				{
					//await context.Database.EnsureCreatedAsync();
					if ((await context.Database.GetPendingMigrationsAsync()).Any())
					{
						await context.Database.MigrateAsync();
					}
				}

				if (context != null && !context.Plans.Any())
				{
					var plans = new List<Plan>()
					{
						new()
						{
							Id = Guid.NewGuid().ToString(),
							Name = PlanType.Basic.ToString(),
							PlanType = PlanType.Basic,
							Cost = 1600m
						},
						new()
						{
							Id = Guid.NewGuid().ToString(),
							Name = PlanType.Standard.ToString(),
							PlanType = PlanType.Standard,
							Cost = 2500m
						},
						new()
						{
							Id = Guid.NewGuid().ToString(),
							Name = PlanType.Premium.ToString(),
							PlanType = PlanType.Premium,
							Cost = 3700m
						}
					};

					context.Plans.AddRange(plans);
					await context.SaveChangesAsync();
				}


				if (!context.Features.Any())
				{
					var basicPlan = context.Plans.FirstOrDefault(x => x.PlanType == PlanType.Basic);
					var standardPlan = context.Plans.FirstOrDefault(x => x.PlanType == PlanType.Standard);
					var premiumPlan = context.Plans.FirstOrDefault(x => x.PlanType == PlanType.Premium);

					var features = new List<Feature>();

					for (int i = 0; i < 5; i++)
					{
						features.Add(new Feature
						{
							Id = Guid.NewGuid().ToString(),
							Name = $"Feature {i} for Basic Plan",
							Description = $"Description for Feature {i + 1}",
							PlanFeatures = new List<PlanFeature>
								{ new PlanFeature { PlanId = basicPlan.Id, FeatureId = Guid.NewGuid().ToString() } }
						});
					}

					for (int i = 0; i < 5; i++)
					{
						var featureId = Guid.NewGuid().ToString();
						features.Add(new Feature
						{
							Id = featureId,
							Name = $"Feature {i} for Standard Plan",
							Description = $"Description for Feature {i + 1}",
							PlanFeatures = new List<PlanFeature>
							{
								new PlanFeature { PlanId = standardPlan.Id, FeatureId = featureId }
							}
						});
					}

					for (int i = 0; i < 5; i++)
					{
						var featureId = Guid.NewGuid().ToString();
						features.Add(new Feature
						{
							Id = featureId,
							Name = $"Feature {i} for Premium Plan",
							Description = $"Description for Feature {i + 1}",
							PlanFeatures = new List<PlanFeature>
							{
								new PlanFeature { PlanId = premiumPlan.Id, FeatureId = featureId }
							}
						});
					}

					context.Features.AddRange(features);
					await context.SaveChangesAsync();
				}


				//if (!context.Movies.Any())
				//{
				//	// Seed movies
				//	var movies = new Movie[]
				//	{
				//		new Movie
				//		{
				//			movieTitle = "BeeKeeper",
				//			Description =
				//				"In the BeeKeeper, one man's brutal campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful organization known as the BeeKeepers",
				//			ReleaseDate = DateTime.Now.ToString(),
				//			DownloadUrl = "https://example.com/movie1",
				//			PosterUrl = "https://example.com/poster1.jpg",
				//			Categories = new List<Category> // Associate the movie with categories
				//			{
				//				new Category
				//					{ Title = "New and Classic Series", ImageUrl = "https://example.com/poster1.jpg" },
				//				new Category { Title = "Popular Movies", ImageUrl = "https://example.com/poster1.jpg" },
				//				new Category
				//					{ Title = "New and Classic Movies", ImageUrl = "https://example.com/poster1.jpg" }
				//			}
				//		}
				//	};
				//	context.Movies.AddRange(movies);
				//	await context.SaveChangesAsync();
				//}
			}
			catch (Exception e)
			{
				Logger.Error(e);
			}
		}
	}
}