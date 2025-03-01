namespace Genova.Temp;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllersWithViews();

        var app = builder.Build();

        app.UseStaticFiles();

        app.UseExceptionHandler("/Error"); // Redirects unhandled exceptions to ErrorController.GeneralError()
        app.UseStatusCodePagesWithReExecute("/Error/{0}"); // Handles 404 and other errors

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}"
            );

        app.Run();
    }
}
