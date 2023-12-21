using Microsoft.AspNetCore.Mvc.Filters;

namespace PBL2.Utility
{
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            base.OnActionExecuting(filterContext);
        }
    }
}
