using System.Linq;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/statistics")]
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
        [Route("geolist/{listId}")]
        public IActionResult GetCheckInStatistics(string listId, CheckInStatFilterDTO filter)
        {
            var result = _statSrv.GetStatOfUsersList
                (_helper.GetAppUserIdByClaims(User.Claims), listId, filter, out int totalItems);

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

        // GET api/check/geolist/{listId}/users
        [HttpGet]
        [Route("geolist/{listId}/users")]
        public IActionResult GetUsersToCheck(string listId)
        {
            var result = _statSrv.GetAllowedUsers(_helper.GetAppUserIdByClaims(User.Claims), listId);

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
