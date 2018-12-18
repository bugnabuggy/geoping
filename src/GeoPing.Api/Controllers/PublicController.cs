using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Route("api/publiclists")]
    public class PublicController: Controller
    {
        private IPublicService _publicSrv;

        public PublicController(IPublicService publicSrv)
        {
            _publicSrv = publicSrv;
        }

        // Get all public lists by filter
        // GET api/publiclists
        [HttpGet]
        public IActionResult GetPublicListsByFilter(PublicGeolistFilterDTO filter)
        {
            var result = _publicSrv.GetByFilter(filter);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // Get all public list of other user by filter
        // GET api/publiclists/user/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetPublicListsOfUserByFilter(Guid userId, PublicGeolistFilterDTO filter)
        {
            var result = _publicSrv.GetByFilter(userId, filter);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // Get DTO containing info about geolist with given Id and its public part (if list is public ofc)
        // GET api/publiclists/{listId}
        [HttpGet("{listId}")]
        public IActionResult GetPublicList(Guid listId)
        {
            var result = _publicSrv.GetPublicList(listId);

            if (result == null)
            {
                return NotFound("List does not exist.");
            }

            return Ok(result);
        }

        // Get points of public geolist
        // GET api/publiclists/{listId}/geopoints
        [HttpGet("{listId}/geopoints")]
        public IActionResult GetPublicPoints(Guid listId)
        {
            if (!_publicSrv.DoesPublicListExist(listId))
            {
                return NotFound("List does not exist.");
            }

            var result = _publicSrv.GetPointsOfPublicList(listId);

            return Ok(result);
        }

        // Get certain point of public geolist
        // GET api/publiclists/{listId}/geopoints/{pointId}
        [HttpGet("{listId}/geopoints/{pointId}")]
        public IActionResult GetPublicPoint(Guid listId, Guid pointId)
        {
            if (!_publicSrv.DoesPublicListExist(listId))
            {
                return NotFound("List does not exist.");
            }

            var result = _publicSrv.GetPointOfPublicList(listId, pointId);

            if (result == null)
            {
                return NotFound("Point does not exist.");
            }

            return Ok(result);
        }
    }
}
