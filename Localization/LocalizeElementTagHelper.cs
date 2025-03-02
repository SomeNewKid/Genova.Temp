using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Genova.Temp.Localization;

// Example use:
//   <h1>
//       <localize>
//           <case culture="zh-HK">測試網站</case>
//           <case culture="zh">测试网站</case>
//           <case culture="ar">موقع اختبار</case>
//           <case culture="en">Test Website</case>
//       </localize>
//   </h1>

[HtmlTargetElement("localize")]
public class LocalizeElementTagHelper : LocalizeTagHelper
{
    public LocalizeElementTagHelper(IHttpContextAccessor httpContextAccessor)
        : base(httpContextAccessor) { }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var localizedContent = await ProcessLocalizationAsync(output);
        output.Content.SetHtmlContent(localizedContent);
        output.TagName = null; // Remove <localize> wrapper
    }
}