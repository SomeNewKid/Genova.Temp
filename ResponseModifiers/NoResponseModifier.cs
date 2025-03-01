using Genova.Temp.Localization;
using System.Reflection.Metadata;

namespace Genova.Temp.ResponseModifiers;

public class NoResponseModifier : IResponseModifier
{
    public NoResponseModifier(ResponseContext responseContext)
    {
    }

    public async Task ModifyResponseAsync(HttpContext context, ResponseStreamWrapper responseStreamWrapper)
    {
        // Write the original content back to the response stream
        await responseStreamWrapper.WriteToOriginalStreamAsync();
    }
}