using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using Microsoft.AspNetCore.SpaServices.Extensions; // Required for UseSpa()

var builder = WebApplication.CreateBuilder(args);

// Add EF Core with SQLite
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlite("Data Source=todo.db"));

// Add controllers
builder.Services.AddControllers();

// Enable Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable serving static files (for Angular build)
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/dist/client-app";
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve static files
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseAuthorization();

app.MapControllers();

// Use SPA middleware
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";

    if (app.Environment.IsDevelopment())
    {
        // Use Angular CLI dev server in development
        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
    }
});

app.Run();