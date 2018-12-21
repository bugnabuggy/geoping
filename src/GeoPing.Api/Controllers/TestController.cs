using System;
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
        private ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation($"TEST LOGGING BY USER {User.Claims.FirstOrDefault(x => x.Type == "sub").Value}");

            _logger.LogError($"TEST ERROR LOGGING BY USER {User.Claims.FirstOrDefault(x => x.Type == "sub").Value}");

            return new JsonResult(from c in User.Claims
                                  select new
                                  {
                                      c.Type,
                                      c.Value
                                  });
        }

        [HttpPost]
        [Route("{id}")]
        public IActionResult GetGuidFromUrl(Guid id)
        {
            return Ok(id);
        }
    }
}