using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Route("api/history")]
    [Authorize]
    public class HistoryController : Controller
    {
        [HttpGet]
        public IActionResult GetUsersHistory()
        {
            return Ok();
        }
    }
}
