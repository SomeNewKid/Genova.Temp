using Genova.Temp.Localization;

namespace Genova.Temp.ResponseModifiers;

public interface IResponseModifier
{
    Task ModifyResponseAsync(HttpContext context, ResponseStreamWrapper responseStreamWrapper);
}