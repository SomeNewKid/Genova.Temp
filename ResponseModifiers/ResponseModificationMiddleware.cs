using System.Text;
using Genova.Temp.Localization;
using Microsoft.AspNetCore.Http;

namespace Genova.Temp.ResponseModifiers;

public class ResponseModificationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ResponseModifierFactory _responseModifierFactory;

    public ResponseModificationMiddleware(RequestDelegate next)
    {
        _next = next;
        _responseModifierFactory = new ResponseModifierFactory();
    }

    public async Task Invoke(HttpContext context, ILocalizationService localizationService)
    {
        string originalRequestPath = context.Request.Path;

        var originalBodyStream = context.Response.Body;

        using (var responseStreamWrapper = new ResponseStreamWrapper(originalBodyStream))
        {
            context.Response.Body = responseStreamWrapper;

            await _next(context);

            string requestPath = context.Request.Path;

            ResponseContext responseContext = new ResponseContext
            {
                OriginalRequestPath = originalRequestPath,
                RequestPath = requestPath,
                CurrentPageCulture = localizationService.CurrentPageCulture
            };

            context.Response.Body = originalBodyStream;

            var contentType = context.Response.ContentType ?? "";

            var responseModifier = _responseModifierFactory.GetResponseModifier(contentType, responseContext);
            await responseModifier.ModifyResponseAsync(context, responseStreamWrapper);
        }
    }
}