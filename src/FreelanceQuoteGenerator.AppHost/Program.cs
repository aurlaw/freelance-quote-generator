var builder = DistributedApplication.CreateBuilder(args);
//
var quoteApi = builder.AddProject<Projects.QuoteApi>("quoteapi")
    .WithExternalHttpEndpoints();

builder.AddNpmApp("quoteGenerator", "../quote-generator", "aspire")
    .WithReference(quoteApi)
    .WaitFor(quoteApi)
    .WithEnvironment("NEXT_PUBLIC_QUOTE_API_URL", quoteApi.GetEndpoint("http"))    
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints();

builder.Build().Run();
