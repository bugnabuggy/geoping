using System.Linq;
using System.Threading.Tasks;
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

        // GET api/statistics
        [HttpGet]
        public IActionResult GetCheckInStatistics(CheckInStatFilterDTO filter)
        {
            var result = _statSrv.GetStatOfLists
                (_helper.GetAppUserIdByClaims(User.Claims), filter, out int totalItems);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // GET api/statistics/geolist
        [HttpGet]
        [Route("geolist")]
        public IActionResult GetFreeChecksInStatistics(CheckInStatFilterDTO filter)
        {
            var result = _statSrv.GetFreeChecksInStat
                (_helper.GetAppUserIdByClaims(User.Claims), filter, out int totalItems);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // GET api/statistics/geolist/{listId}
        [HttpGet]
        [Route("geolist/{listId}")]
        public async Task<IActionResult> GetCheckInStatisticsForList(string listId, CheckInStatFilterDTO filter)
        {
            var result = await _statSrv.GetStatOfList
                (_helper.GetAppUserIdByClaims(User.Claims), listId, filter);

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

        // GET api/statistics/geolist/{listId}/users
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

        // GET api/statistics/history
        [HttpGet]
        [Route("history")]
        public IActionResult GetChecksInHistory(CheckInHistoryFilterDTO filter)
        {
            var result = _statSrv.GetChecksInHistory(_helper.GetAppUserIdByClaims(User.Claims), filter);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
