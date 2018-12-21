using System;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist")]
    [Authorize]
    public class GeolistController : Controller
    {
        private IGeolistService _geolistSrv;
        private ISecurityService _securitySrv;
        private IClaimsHelper _helper;

        public GeolistController
            (IGeolistService geolistSrv,
            IClaimsHelper helper,
            ISecurityService securitySrv)
        {
            _geolistSrv = geolistSrv;
            _helper = helper;
            _securitySrv = securitySrv;
        }

        // Get lists where user is owner by filter
        // GET api/geolist
        [HttpGet]
        public IActionResult GetListsByFilter(UsersGeolistFilterDTO filter)
        {
            var result = _geolistSrv.GetByFilter(_helper.GetAppUserIdByClaims(User.Claims), filter, out int totalItems);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // Get lists where user is owner by filter
        // GET api/geolist
        [HttpGet]
        [Route("allowed")]
        public IActionResult GetUsersAllowedLists()
        {
            var result = _geolistSrv.GetAllowedLists(_helper.GetAppUserIdByClaims(User.Claims));

            return Ok(result);
        }

        // GET api/geolist/{Id}
        [HttpGet]
        [Route("{Id}")]
        public IActionResult GetList(string id)
        {
            if (!_geolistSrv.TryGetListWithId(id, out var result))
            {
                return NotFound();
            }

            if (_securitySrv.IsUserHasAccessToWatchList(_helper.GetAppUserIdByClaims(User.Claims), result))
            {
                return Ok(result); 
            }

            return Unauthorized();
        }

        // POST api/geolist/
        [HttpPost]
        public IActionResult AddList([FromBody]GeolistDTO item)
        {
            var list = new GeoList
            {
                Name = item.Name,
                Description = item.Description,
                IsPublic = item.IsPublic,
                OwnerId = _helper.GetAppUserIdByClaims(User.Claims),
                Created = DateTime.UtcNow,
                Period = item.Period
            };

            var result = _geolistSrv.Add(list);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // PUT api/geolist/{Id}
        [HttpPut]
        [Route("{Id}")]
        public async Task<IActionResult> EditList(string id, [FromBody]GeolistDTO item)
        {
            var isListExist = _geolistSrv.TryGetListWithId(id, out var list);

            if (!isListExist)
            {
                return NotFound();
            }

            list.Name = item.Name;
            list.Description = item.Description;
            list.IsPublic = item.IsPublic;
            list.Edited = DateTime.UtcNow;
            list.Period = item.Period;

            var result = await _geolistSrv.Update(_helper.GetAppUserIdByClaims(User.Claims), list);

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

        // DELETE api/geolist/
        [HttpDelete]
        public async Task<IActionResult> RemoveLists(string ids)
        {
            var result = await _geolistSrv.Delete(_helper.GetAppUserIdByClaims(User.Claims), ids);

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

        // DELETE api/geolist/{Id}
        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> RemoveList(string id)
        {
            var isListExist = _geolistSrv.TryGetListWithId(id, out var list);

            if (!isListExist)
            {
                return NotFound();
            }

            var result = await _geolistSrv.Delete(_helper.GetAppUserIdByClaims(User.Claims), list);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}