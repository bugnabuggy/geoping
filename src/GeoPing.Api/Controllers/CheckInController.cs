using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist/{listId}")]
    //[Authorize]
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

        // GET api/geolist/{listId}/geopoint/check
        [HttpGet]
        [Route("check")]
        public IActionResult GetChecksIn(string listId)
        {
            var result = _checkInSrv.GetChecksIn(listId, _helper.GetAppUserIdByClaims(User.Claims));

            if (result.Success)
            {
                return Ok(result); 
            }

            return BadRequest(result);
        }

        // GET api/geolist/{listId}/geopoint/{pointId}/check
        [HttpGet]
        [Route("geopoint/{pointId}/check")]
        public IActionResult GetCheckIn(string pointId)
        {
            var result = _checkInSrv.GetCheckIn(pointId, _helper.GetAppUserIdByClaims(User.Claims));

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // POST api/geolist/{listId}/geopoint/{pointId}/check
        [HttpPost]
        [Route("geopoint/{pointId}/check")]
        public IActionResult AddCheckIn(string pointId, [FromBody]CheckInDTO item)
        {
            if (!_checkInSrv.IsPointExistWithThisId(pointId, out GeoPoint point))
            {
                return BadRequest($"There is no point with Id = [{pointId}].");
            }

            var userId = new Guid();

            try
            {
                userId = _helper.GetAppUserIdByClaims(User.Claims);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var checkIn = new CheckIn()
            {
                Distance = item.Distance,
                Latitude = item.Latitude,
                Longitude = item.Longitude,
                Ip = item.Ip,
                DeviceId = item.DeviceId,
                UserAgent = item.UserAgent,
                Date = DateTime.UtcNow,
                PointId = point.Id,
                UserId = userId
            };

            var result = _checkInSrv.AddCheckIn(checkIn);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
