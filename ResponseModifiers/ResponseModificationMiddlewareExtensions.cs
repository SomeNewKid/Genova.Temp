
namespace Genova.Temp.ResponseModifiers;

public static class ResponseModificationMiddlewareExtensions
{
    public static IApplicationBuilder UseResponseModifications(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ResponseModificationMiddleware>();
    }
}