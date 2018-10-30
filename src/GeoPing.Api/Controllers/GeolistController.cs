using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist")]
    //[Authorize]
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
            var userId = _helper.GetAppUserIdByClaims(User.Claims);

            var result = _geolistSrv.GetByFilter(userId, filter, out int totalItems);
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
        public IActionResult GetList(string Id)
        {
            var listStatus = SecListCheck(Id, out GeoList result);

            if (listStatus.StatusCode == 200)
            {
                return Ok(result);
            }
            return StatusCode(listStatus.StatusCode, listStatus.Message);
        }

        // POST api/geolist/
        [HttpPost]
        public IActionResult AddList([FromBody]GeolistToManipDTO item)
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
        public IActionResult EditList(string Id, [FromBody]GeolistToManipDTO item)
        {
            var listStatus = SecListCheck(Id, out GeoList list);

            if (listStatus.StatusCode != 200)
            {
                return StatusCode(listStatus.StatusCode, listStatus.Message);
            }

            list.Name = item.Name;
            list.Description = item.Description;
            list.IsPublic = item.IsPublic;
            list.Edited = DateTime.UtcNow;

            var result = _geolistSrv.Update(list);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/geolist/
        [HttpDelete]
        public IActionResult RemoveLists(string Ids)
        {
            var idList = Ids.Split(new char[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries)
                            .ToArray();

            if (idList != null)
            {
                foreach (var Id in idList)
                {
                    var listStatus = SecListCheck(Id, out GeoList list);

                    if (listStatus.StatusCode != 200)
                    {
                        continue;
                    }

                    var result = _geolistSrv.Delete(list);

                    if (!result.Success)
                    {
                        return StatusCode(500);
                    }
                }
                return Ok(new OperationResult
                {
                    Success = true,
                    Messages = new[] { $"Geolists with Id-s = [{Ids}] were removed" },
                    Data = Ids
                });
            }
            return BadRequest($"Something is wrong in IDs string: [{Ids}]");
        }

        // DELETE api/geolist/{Id}
        [HttpDelete]
        [Route("{Id}")]
        public IActionResult RemoveList(string Id)
        {
            var listStatus = SecListCheck(Id, out GeoList list);

            if (listStatus.StatusCode != 200)
            {
                return StatusCode(listStatus.StatusCode, listStatus.Message);
            }

            var result = _geolistSrv.Delete(list);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        private GPStatusCodeResult SecListCheck(string Id, out GeoList list)
        {
            var isListId = Guid.TryParse(Id, out Guid listId);
            list = null;
            if (!isListId)
            {
                return new GPStatusCodeResult(400, "Invalid list identifier");
            }

            list = _geolistSrv.Get(x => x.Id == listId).FirstOrDefault();
            if (list == null)
            {
                return new GPStatusCodeResult(404, "There is no geolist with given Id");
            }

            if (list.OwnerId != _helper.GetAppUserIdByClaims(User.Claims))
            {
                return new GPStatusCodeResult(401, "You have no rights to manipulate with this geolist");
            }

            return new GPStatusCodeResult(200);
        }
    }
}