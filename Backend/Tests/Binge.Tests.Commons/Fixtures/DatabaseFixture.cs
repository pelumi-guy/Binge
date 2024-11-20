using AspNetCoreHero.Results;
using AutoFixture;
using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Infrastructure.Utility;
using Binge.Tests.Commons.Containers;
using Binge.Tests.Commons.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Headers;
using WireMock.Server;

namespace Binge.Tests.Commons.Fixtures
{
	public class DatabaseFixture : IDisposable
	{
		public DatabaseFixture()
		{
			MockServer = WireMockServer.Start();

			Container = new BingeTestContainer();

			Client = Container.CreateClient();

			Server = Container.Server;

			InitializeDatabase();
		}

		public BingeTestContainer Container { get; private set; }
		public TestServer Server { get; private set; }

		public HttpClient Client { get; private set; }

		public WireMockServer MockServer { get; private set; }

		private void InitializeDatabase()
		{
			var dbContextFactory = Container.Services.GetRequiredService<IDbContextFactory<BingeContext>>();

			using var dbContext = dbContextFactory.CreateDbContext();
			dbContext.Database.EnsureDeleted();
			dbContext.Database.EnsureCreated();
			dbContext.SaveChanges();
		}

		private async Task<IResult<AppUser>> FakeUserRegistration()
		{
			using var scope = Container.Services.CreateScope();
			var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

			var user = Container.FakeBuild<AppUser>().With(x => x.Email, "test@email.com").Create();

			var createdResponse = await userManager.CreateAsync(user, FakeUserDetails.Password);

			if (!createdResponse.Succeeded)
				return await Result<AppUser>.FailAsync(message: "Failed to create user");

			return await Result<AppUser>.SuccessAsync(data: user);
		}

		public async Task<IResult> FakeUserLogin()
		{
			using var scope = Container.Services.CreateScope();
			var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

			var configuration = Container.Services.GetRequiredService<IConfiguration>();

			var user = await FakeUserRegistration();

			if (!user.Succeeded)
				return Result.Fail();

			var checkPassword = await userManager.CheckPasswordAsync(user.Data, FakeUserDetails.Password);

			if (!checkPassword)
				return Result.Fail("Login Failed");

			var token = await TokenGenerator.GenerateUserToken(user.Data, userManager, configuration);

			Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

			return Result.Success();
		}

		public void Dispose()
		{
			MockServer.Dispose();
			var dbContextFactory = Server.Services
				.GetRequiredService<IDbContextFactory<BingeContext>>();

			using var dbContext = dbContextFactory.CreateDbContext();
			dbContext.Database.EnsureDeleted();

			Container.Dispose();
		}
	}
}