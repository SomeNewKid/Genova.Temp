using System.Text;
using Genova.Temp.Localization;

namespace Genova.Temp.ResponseModifiers;

/*********************************************************************
 * 
 * THIS CLASS IS NOT IMPLEMENTED!!!!
 * 
 * It is used merely as a placeholder for how a response modifier 
 * could be implemented for binary files.
 * 
 * If we do modify binary files, we should introduce a base class
 * for all binary files, with PNG being a concrete implementation.
 * 
 * If this happens, be sure to manage the "Content-Length" header,
 * just as the TextResponseModifier needed to do.
 * 
 *********************************************************************/
public class PngResponseModifier : IResponseModifier
{
    public PngResponseModifier(ResponseContext responseContext)
    {
    }

    public async Task ModifyResponseAsync(HttpContext context, ResponseStreamWrapper responseStreamWrapper)
    {
        // Reverse the binary content
        var binaryContent = responseStreamWrapper.GetBinaryContent();
        Array.Reverse(binaryContent);

        await context.Response.Body.WriteAsync(binaryContent, 0, binaryContent.Length);
    }
}