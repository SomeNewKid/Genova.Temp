using Genova.Temp.Localization;

namespace Genova.Temp.ResponseModifiers;

public class CssResponseModifier : TextResponseModifier
{
    public CssResponseModifier(ResponseContext responseContext)
        : base(responseContext)
    {
    }

    protected override string ModifyContent(string content)
    {
        return content + "\n/* Modified by middleware */";
    }
}