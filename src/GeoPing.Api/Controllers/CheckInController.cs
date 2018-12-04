using System;
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

        // GET api/geolist/{listId}/geopoint/check
        [HttpGet]
        [Route("geolist/{listId}")]
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

        // POST api/geolist/{listId}/geopoint/{pointId}/check
        [HttpPost]
        [Route("geopoint/{pointId}")]
        public IActionResult AddCheckIn(string pointId, [FromBody]CheckInDTO item)
        {
            if (!_checkInSrv.IsPointExistWithThisId(pointId, out GeoPoint point))
            {
                return BadRequest($"There is no point with Id = [{pointId}].");
            }

            Guid userId;

            try
            {
                userId = _helper.GetAppUserIdByClaims(User.Claims);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var checkIn = new CheckIn
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
