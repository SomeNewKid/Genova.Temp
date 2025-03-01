using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Genova.Temp.Controllers;

public class HelloController : Controller
{
    public IActionResult Index()
    {
        StringBuilder html = new StringBuilder();

        html.Append("<!DOCTYPE html>");
        html.Append("<html lang='en'>");
        html.Append("<head>");
        html.Append("  <meta charset='UTF-8'>");
        html.Append("  <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        html.Append("  <title>Hello</title>");
        html.Append("</head>");
        html.Append("<body>");
        html.Append("  <h1>Hello</h1>");
        html.Append("  <p>Hello, world!</p>");
        html.Append("</body>");
        html.Append("</html>");

        return Content(html.ToString(), "text/html");
    }

    public IActionResult Error()
    {
        throw new ApplicationException("This is a test error.");
    }


    public IActionResult Missing()
    {
        return NotFound();
    }
}
