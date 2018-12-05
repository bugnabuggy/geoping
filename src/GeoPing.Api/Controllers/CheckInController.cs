using System;
using System.Linq;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/check")]
    [Authorize]
    public class CheckInController : Controller
    {
        private ICheckInService _checkInSrv;
        private IClaimsHelper _helper;

        public CheckInController(ICheckInService checkInSrv,
                                 IClaimsHelper helper)
        {
            _checkInSrv = checkInSrv;
            _helper = helper;
        }

        // GET api/check/geolist/{listId}
        [HttpGet]
        [Route("geolist/{listId}")]
        public IActionResult GetChecksIn(string listId)
        {
            var result = _checkInSrv.GetChecksIn(_helper.GetAppUserIdByClaims(User.Claims), listId);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // GET api/check/geopoint/{pointId}
        [HttpGet]
        [Route("geopoint/{pointId}")]
        public IActionResult GetCheckIn(string pointId)
        {
            var result = _checkInSrv.GetCheckIn(pointId, _helper.GetAppUserIdByClaims(User.Claims));

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // POST api/check/geopoint/{pointId}
        [HttpPost]
        [Route("geopoint/{pointId}")]
        public IActionResult AddCheckIn(string pointId, [FromBody]CheckInDTO item)
        {
            if (pointId == "null")
            {
                pointId = null;
            }

            var result = _checkInSrv.AddCheckIn(_helper.GetAppUserIdByClaims(User.Claims), pointId, item);

            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Messages.Contains("Unauthorized"))
            {
                return Unauthorized();
            }

            return BadRequest(result);
        }
    }
}
