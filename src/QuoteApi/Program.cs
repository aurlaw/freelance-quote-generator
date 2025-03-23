using Microsoft.EntityFrameworkCore;
using QuoteApi.Models;
using QuoteApi.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
// Add services to the container.
// Add SQLite
builder.Services.AddDbContext<QuoteDbContext>(options =>
    options.UseSqlite("Data Source=quotes.db"));

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Ensure DB is created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<QuoteDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Layout = ScalarLayout.Modern;
        options.Theme = ScalarTheme.Moon;
        options.WithDefaultHttpClient(ScalarTarget.JavaScript, ScalarClient.Axios);
    });
}

// Endpoints
app.MapGet("/quotes", async (QuoteDbContext db) =>
    await db.Quotes.ToListAsync());

app.MapPost("/quotes", async (QuoteRequest request, QuoteDbContext db) =>
{
    // Calculate estimate
    decimal baseCost = request.ProjectType switch
    {
        "Website" => 1000,
        "Web App" => 2000,
        "Mobile Add-On" => 500,
        _ => 1000
    };

    decimal scopeMultiplier = request.Scope switch
    {
        "Small" => 1.0m,
        "Medium" => 1.5m,
        "Large" => 2.0m,
        _ => 1.0m
    };

    decimal cost = baseCost * scopeMultiplier * (request.IsRush ? 1.2m : 1.0m);
    string time = request.Scope switch
    {
        "Small" => "1 week",
        "Medium" => "2 weeks",
        "Large" => "3 weeks",
        _ => "1 week"
    };
    time = request.IsRush ? time.Replace("weeks", "week") : time;

    request.EstimatedCost = cost;
    request.EstimatedTime = time;

    db.Quotes.Add(request);
    await db.SaveChangesAsync();
    return Results.Created($"/quotes/{request.Id}", request);
});


app.UseHttpsRedirection();

app.Run();
