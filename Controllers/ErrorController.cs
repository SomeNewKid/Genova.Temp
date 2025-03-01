using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Genova.Temp.Controllers;

public class ErrorController : Controller
{
    [Route("Error/{statusCode?}")]
    public IActionResult HandleError(int? statusCode)
    {
        if (statusCode == 404)
        {
            return View("NotFound");
        }

        var exceptionHandlerPathFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

        string errorMessage = "An unexpected error occurred.";
        if (exceptionHandlerPathFeature != null && !string.IsNullOrWhiteSpace(exceptionHandlerPathFeature.Error.Message))
        {
            errorMessage = exceptionHandlerPathFeature.Error.Message;
        }

        ViewData["ErrorMessage"] = errorMessage;
        return View("Index"); // Generic error page for non-404 errors
    }
}