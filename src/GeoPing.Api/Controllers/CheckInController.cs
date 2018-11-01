﻿using System;
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
    [Route("api/geolist/{listId}/geopoint")]
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

        // GET
        [HttpGet]
        [Route("check")]
        public IActionResult GetCheckIns(string listId)
        {
            return Ok();
        }

        // POST api/geolist/{listId}/geopoint/{pointId}/check
        [HttpPost]
        [Route("{pointId}/check")]
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
                Date = DateTime.UtcNow,
                Distance = item.Distance,
                Latitude = item.Latitude,
                Longitude = item.Longitude,
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
