using Microsoft.AspNetCore.Mvc;

namespace Genova.Temp.Controllers;

public class AboutController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
