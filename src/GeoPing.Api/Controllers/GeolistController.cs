using GeoPing.Api.Interfaces;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist")]
    [Authorize]
    public class GeolistController : Controller
    {
        private IGeolistService _geolistSrv;
        private IClaimsHelper _helper;

        public GeolistController(IGeolistService geolistSrv,
                                 IClaimsHelper helper)
        {
            _geolistSrv = geolistSrv;
            _helper = helper;
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

        // Get all public lists by filter
        // GET api/geolist/public
        [HttpGet]
        [Route("public")]
        [AllowAnonymous]
        public IActionResult GetPublicListsByFilter(PublicGeolistFilterDTO filter)
        {
            var result = _geolistSrv.GetByFilter(filter, out int totalItems);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // Get all public list of other user by filter
        // GET api/geolist/public/{userId}
        [HttpGet]
        [Route("public/{userId}")]
        [AllowAnonymous]
        public IActionResult GetPublicListsOfUserByFilter(string userId, PublicGeolistFilterDTO filter)
        {
            var isId = Guid.TryParse(userId, out Guid ownerId);
            var result = new WebResult<IQueryable<PublicListDTO>>() { Messages = new[] { "Unvalid user identifier" } };
            if (isId)
            {
                result = _geolistSrv.GetByFilter(ownerId, filter, out int totalItems);
                if (result.Success)
                {
                    return Ok(result);
                }
            }

            return BadRequest(result);
        }

        // GET api/geolist/{Id}
        [HttpGet]
        [Route("{Id}")]
        public IActionResult GetList(string id)
        {
            if (_geolistSrv.IsListExistWithThisId(id, out GeoList result))
            {
                return Ok(result);
            }

            return NotFound();
        }

        // POST api/geolist/
        [HttpPost]
        public IActionResult AddList([FromBody]GeolistDTO item)
        {
            var list = new GeoList()
            {
                Name = item.Name,
                Description = item.Description,
                IsPublic = item.IsPublic,
                OwnerId = _helper.GetAppUserIdByClaims(User.Claims),
                Created = DateTime.UtcNow
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
        public IActionResult EditList(string id, [FromBody]GeolistDTO item)
        {
            var isListExist = _geolistSrv.IsListExistWithThisId(id, out GeoList list);

            if (!isListExist)
            {
                return NotFound();
            }

            list.Name = item.Name;
            list.Description = item.Description;
            list.IsPublic = item.IsPublic;
            list.Edited = DateTime.UtcNow;

            var result = _geolistSrv.Update(_helper.GetAppUserIdByClaims(User.Claims), list);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/geolist/
        [HttpDelete]
        public IActionResult RemoveLists(string ids)
        {

            var result = _geolistSrv.Delete(_helper.GetAppUserIdByClaims(User.Claims), ids);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/geolist/{Id}
        [HttpDelete]
        [Route("{Id}")]
        public IActionResult RemoveList(string id)
        {
            var isListExist = _geolistSrv.IsListExistWithThisId(id, out GeoList list);

            if (!isListExist)
            {
                return NotFound();
            }

            var result = _geolistSrv.Delete(_helper.GetAppUserIdByClaims(User.Claims), list);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}