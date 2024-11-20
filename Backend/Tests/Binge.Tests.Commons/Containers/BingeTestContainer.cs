using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Dsl;
using Binge.Api.Extensions;
using Binge.Application;
using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Infrastructure;
using Binge.Tests.Commons.Models;
using FluentValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace Binge.Tests.Commons.Containers
{
	public class BingeTestContainer : WebApplicationFactory<Program>
	{
		protected override void ConfigureWebHost(IWebHostBuilder builder)
		{
			var environmentName = "Test";

			var configuration = new ConfigurationBuilder()
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.Build();
			builder.ConfigureServices(services =>
			{
				var dbContextDescriptor = services.SingleOrDefault(
					d => d.ServiceType == typeof(DbContextOptions<BingeContext>));

				if (dbContextDescriptor != null)
				{
					services.Remove(dbContextDescriptor);
				}

				// Remove Identity-related services
				var identityDescriptor = services.SingleOrDefault(
					d => d.ServiceType == typeof(IdentityBuilder));

				if (identityDescriptor != null)
				{
					services.Remove(identityDescriptor);
				}

				// Add your DbContext without Identity
				services.AddDbContextFactory<BingeContext>(options =>
				{
					options.UseInMemoryDatabase(TestDbConfigurations.ConnectionString);
				});


				//services.AddIdentity<AppUser, IdentityRole>()
				//	.AddEntityFrameworkStores<BingeContext>()
				//	.AddDefaultTokenProviders();
			}).UseConfiguration(configuration);
		}

		private readonly IServiceProvider _serviceProvider;
		private readonly Fixture _fixture;
		//public DbContextOptions<BingeContext> Options { get; set; }

		public BingeTestContainer()
		{
			_fixture = new Fixture();
			_fixture.Customize(new AutoMoqCustomization());

			var services = new ServiceCollection();

			// Add other services
			services.AddSingleton(_fixture);
			services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

			services.AddLogging(builder =>
			{
				builder.AddConsole();
				builder.AddDebug();
			});

			_serviceProvider = services.BuildServiceProvider();
		}

		public void Dispose()
		{
			(_serviceProvider as IDisposable)?.Dispose();
		}

		public T? Get<T>() => _serviceProvider.GetRequiredService<T>();

		public T? Fake<T>() => _fixture.Create<T>();

		public ICustomizationComposer<T> FakeBuild<T>() => _fixture.Build<T>();
	}
}