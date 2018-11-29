using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Route("[Controller]")]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims
                                  select new
                                  {
                                      c.Type,
                                      c.Value
                                  });
        }
    }
}