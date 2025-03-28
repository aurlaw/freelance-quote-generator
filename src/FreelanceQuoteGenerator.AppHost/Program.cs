var builder = DistributedApplication.CreateBuilder(args);
//
var quoteApi = builder.AddProject<Projects.QuoteApi>("quoteapi")
    .WithExternalHttpEndpoints();

builder.AddNpmApp("quoteGenerator-Next", "../quote-generator", "aspire")
    .WithReference(quoteApi)
    .WaitFor(quoteApi)
    .WithEnvironment("NEXT_PUBLIC_QUOTE_API_URL", quoteApi.GetEndpoint("http"))    
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints();

builder.AddNpmApp("quoteGenerator-Vue", "../quote-generator-vue", "aspire")
    .WithReference(quoteApi)
    .WaitFor(quoteApi)
    .WithEnvironment("VITE_QUOTE_API_URL", quoteApi.GetEndpoint("http"))    
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints();

builder.AddNpmApp("quoteGenerator-Svelte", "../quote-generator-svelte", "aspire")
    .WithReference(quoteApi)
    .WaitFor(quoteApi)
    .WithEnvironment("VITE_QUOTE_API_URL", quoteApi.GetEndpoint("http"))    
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints();


builder.Build().Run();
