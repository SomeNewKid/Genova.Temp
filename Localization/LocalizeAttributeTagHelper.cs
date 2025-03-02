using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Genova.Temp.Localization;

// Example use:
//   <h1 localize>
//       <case culture="zh-HK">測試網站</case>
//       <case culture="zh">测试网站</case>
//       <case culture="ar">موقع اختبار</case>
//       <case culture="en">Test Website</case>
//   </h1>

[HtmlTargetElement(Attributes = "localize")]
public class LocalizeAttributeTagHelper : LocalizeTagHelper
{
    public LocalizeAttributeTagHelper(IHttpContextAccessor httpContextAccessor)
        : base(httpContextAccessor) { }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var localizedContent = await ProcessLocalizationAsync(output);

        // Replace content inside existing element (e.g., <a>)
        output.Content.SetHtmlContent(localizedContent);

        // Remove "localize" attribute so it doesn't appear in final HTML
        output.Attributes.RemoveAll("localize");
    }
}