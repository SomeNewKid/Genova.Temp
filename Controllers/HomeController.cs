using Microsoft.AspNetCore.Mvc;

namespace Genova.Temp.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
