using Binge.Api.Extensions;
using Binge.Application;
using Binge.Application.Services.Implementation;
using Binge.Application.Services.Interface;
using Binge.Infrastructure;
using Binge.Infrastructure.Seed;
using NLog.Web;
using RestSharp;

var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = builder.Configuration;


builder.Configuration
	.SetBasePath(Directory.GetCurrentDirectory())
	.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
	.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);
//LogManager.Configuration = new NLogLoggingConfiguration(builder.Configuration.GetSection("NLog"));
// Add services to the container.
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.ConfigureInfraStructure(builder.Configuration);
builder.Services.AddSingleton<EmailConfiguration>(provider =>
{
	// Retrieve email configuration from appsettings.json
	var emailConfig = new EmailConfiguration();
	configuration.GetSection("EmailConfiguration").Bind(emailConfig);
	return emailConfig;
});
builder.Services.AddControllers();

// TMDB 
builder.Services.AddSingleton<IRestClient, RestClient>(serviceProvider =>
{
	var client = new RestClient("https://api.themoviedb.org/3/");
	return client;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContextAndConfigurations(builder.Configuration);
builder.Services.ConfigureAuthentication(builder.Configuration);
builder.Services.ConfigureAutoMappers();
builder.Services.AddSwaggerCustomization();
builder.Services.ConfigureIdentity();
builder.Services.ConfigureApplication(builder.Configuration);
builder.Services.RegisterRepositories();

// NLog: Setup NLog for Dependency injection
builder.Logging.ClearProviders();
//builder.Host.UseNLog();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAllOrigins", builder =>
	{
		builder.WithOrigins("https://binge-frontend.vercel.app", "https://binge.decagon.dev",
				"http://localhost:3000", "http://localhost:3004")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

Seeder.SeedData(app).Wait();

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program
{
}