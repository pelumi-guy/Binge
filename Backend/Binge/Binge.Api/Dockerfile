#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Binge.Api/Binge.Api.csproj", "Binge.Api/"]
COPY ["Binge.Application/Binge.Application.csproj", "Binge.Application/"]
COPY ["Binge.Infrastructure/Binge.Infrastructure.csproj", "Binge.Infrastructure/"]
COPY ["Binge.Domain/Binge.Domain.csproj", "Binge.Domain/"]
RUN dotnet restore "./Binge.Api/Binge.Api.csproj"
COPY . .
WORKDIR "/src/Binge.Api"
RUN dotnet build "./Binge.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Binge.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Binge.Api.dll"]