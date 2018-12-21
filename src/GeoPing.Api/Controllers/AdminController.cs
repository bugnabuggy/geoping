using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Authorize]
    [Route("api/admin")]
    public class AdminController : Controller
    {
        private IGeolistService _geolistSrv;
        private IGeopointService _geopointSrv;
        private IGeopingUserService _userSrv;
        private IClaimsHelper _helper;

        public AdminController
            (IGeolistService geolistSrv,
            IGeopointService geopointSrv,
            IGeopingUserService userSrv,
            IClaimsHelper helper)
        {
            _geolistSrv = geolistSrv;
            _geopointSrv = geopointSrv;
            _userSrv = userSrv;
            _helper = helper;
        }

        [HttpGet("lists")]
        public IActionResult GetAllOfLists()
        {
            var result = _geolistSrv.Get();

            return Ok(result);
        }

        [HttpGet("users")]
        public IActionResult GetAllOfUsers()
        {
            var result = _userSrv.GetUsers(x => true);

            return Ok(result);
        }
    }
}
