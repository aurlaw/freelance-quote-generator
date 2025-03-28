FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/QuoteApi/QuoteApi.csproj", "QuoteApi/"]
COPY ["src/FreelanceQuoteGenerator.ServiceDefaults/FreelanceQuoteGenerator.ServiceDefaults.csproj", "FreelanceQuoteGenerator.ServiceDefaults/"]
RUN dotnet restore "QuoteApi/QuoteApi.csproj"
COPY ./src .
WORKDIR "/src/QuoteApi"
RUN dotnet build QuoteApi.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish QuoteApi.csproj  -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "QuoteApi.dll"]

