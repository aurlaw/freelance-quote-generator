var builder = DistributedApplication.CreateBuilder(args);
//
var quoteApi = builder.AddProject<Projects.QuoteApi>("quoteapi")
    .WithExternalHttpEndpoints();

var quoteFrontend = builder.AddNpmApp("quotefrontend", "../quote-frontend")
    .WithReference(quoteApi)
    .WaitFor(quoteApi)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints();

builder.Build().Run();
