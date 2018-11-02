using GeoPing.Api.Interfaces;
using GeoPing.Core.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/check")]
    [Authorize]
    public class CheckInStatisticsController : Controller
    {
        private ICheckInStatisticsService _statSrv;
        private IClaimsHelper _helper;

        public CheckInStatisticsController(ICheckInStatisticsService statSrv,
                                            IClaimsHelper helper)
        {
            _statSrv = statSrv;
            _helper = helper;
        }

        [HttpGet]
        public IActionResult GetCheckInStatistics(CheckInStatFilterDTO filter)
        {


            return Ok();
        }
    }
}
