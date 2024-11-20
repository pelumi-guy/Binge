using AspNetCoreHero.Results;
using AutoFixture;
using Binge.Domain.Context;
using Binge.Domain.ResponseDto;
using Binge.Domain.ViewModel;
using Binge.Tests.Commons.Containers;
using Binge.Tests.Commons.Fixtures;
using FluentAssertions;

namespace Binge.IntegrationTests.Authentication
{
	[Collection(nameof(TestCollectionFixture))]
	public class RegistrationTests
	{
		private const string RegisterUrlPath = "api/v1/Authentication/register";
		private readonly DatabaseFixture _fixture;

		public RegistrationTests()
		{
			_fixture = new DatabaseFixture();
			_fixture.MockServer.Reset();
		}

		[Fact]
		public async Task ShouldRegisterAUser()
		{
			//Arrange
			var registrationModel = _fixture.Container.FakeBuild<RegistrationModel>()
				.With(x => x.Email, "test@gmail.com")
				.With(x => x.Password, "Password@123")
				.With(x => x.ConfirmPassword, "Password@123")
				.Create();

			//Act
			var registerUser = await _fixture.Client.PostAsJsonAsync(RegisterUrlPath, registrationModel);

			var registeredUserData = await registerUser.Content.ReadAsAsync<Result<CreateUserDto>>();

			//Assert
			registeredUserData.Succeeded.Should().BeTrue();
			registeredUserData.Data.Should().NotBeNull();
			registeredUserData.Data.Id.Should().NotBeNull();
		}


		public void Dispose()
		{
			_fixture.Dispose();
		}
	}
}