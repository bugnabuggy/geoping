using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GeoPing.Api.Controllers
{
    [Route("test")]
    [Authorize]
    public class TestController : ControllerBase
    {
        private ILogger _logger;

        public TestController(ILogger logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation($"TEST LOGGING BY USER {User.Claims.FirstOrDefault(x => x.Type == "sub").Value}");

            return new JsonResult(from c in User.Claims
                                  select new
                                  {
                                      c.Type,
                                      c.Value
                                  });
        }
    }
}