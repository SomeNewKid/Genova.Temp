using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Genova.Temp.Localization;

namespace Genova.Temp.ResponseModifiers;

public abstract class TextResponseModifier : IResponseModifier
{
    private readonly ResponseContext _responseContext;

    protected TextResponseModifier(ResponseContext responseContext)
    {
        _responseContext = responseContext;
    }

    protected ResponseContext ResponseContext
    {
        get { return _responseContext; }
    }

    public async Task ModifyResponseAsync(HttpContext context, ResponseStreamWrapper responseStreamWrapper)
    {
        var content = responseStreamWrapper.GetContent();

        var modifiedContent = ModifyContent(content);

        var modifiedContentBytes = Encoding.UTF8.GetBytes(modifiedContent);

        // Remove the Content-Length header to avoid mismatch
        context.Response.Headers.Remove("Content-Length");

        // Set the Content-Length header to the length of the modified content
        context.Response.ContentLength = modifiedContentBytes.Length;

        await context.Response.Body.WriteAsync(modifiedContentBytes, 0, modifiedContentBytes.Length);
    }

    protected abstract string ModifyContent(string content);
}