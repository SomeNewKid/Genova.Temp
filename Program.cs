using Genova.Temp.Localization;
using Genova.Temp.ResponseModifiers;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace Genova.Temp;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = CreateWebApplicationBuilder(args);
        var app = BuildWebApplication(builder);
        app.Run();
    }

    private static WebApplicationBuilder CreateWebApplicationBuilder(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var services = builder.Services;
        var configuration = builder.Configuration;

        // Configure localization

        services.ConfigureLocalization(configuration);
        
        services.AddLocalization(options => options.ResourcesPath = "Resources");
        
        // Configure MVC

        services.AddControllersWithViews();   
        
        services.AddHttpContextAccessor();

        services.AddRouting(options =>
        {
            options.LowercaseUrls = true; // Force lowercase URLs
            options.LowercaseQueryStrings = false; // Keep query strings case-sensitive
        });

        return builder;
    }

    private static WebApplication BuildWebApplication(WebApplicationBuilder builder)
    {
        var app = builder.Build();

        app.UseResponseModifications();

        // Don't use builder.Environment after the app is built
        var environment = app.Services.GetRequiredService<IWebHostEnvironment>();

        app.UseStaticFiles(new StaticFileOptions
        {
            OnPrepareResponse = ctx =>
            {
                if (environment.IsDevelopment()) // Disable caching in Development
                {
                    ctx.Context.Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0";
                    ctx.Context.Response.Headers["Pragma"] = "no-cache";
                    ctx.Context.Response.Headers["Expires"] = "0";
                }
            }
        });

        app.UseLocalization();

        app.UseRouting();

        app.UseStatusCodePagesWithReExecute("/Error/{0}"); // Handles 404 and other errors

        app.UseExceptionHandler(new ExceptionHandlerOptions
        {
            ExceptionHandlingPath = "/Error",
            AllowStatusCode404Response = true
        });

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}"
        );

        return app;
    }
}