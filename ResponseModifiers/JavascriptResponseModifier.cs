using Genova.Temp.Localization;

namespace Genova.Temp.ResponseModifiers;

public class JavascriptResponseModifier : TextResponseModifier
{
    public JavascriptResponseModifier(ResponseContext responseContext)
        : base(responseContext)
    {
    }

    protected override string ModifyContent(string content)
    {
        return content + "\n/* Modified by middleware */";
    }
}