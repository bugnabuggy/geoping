﻿using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.DTO;
using GeoPing.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist/{ListId}/geopoint")]
    public class GeopointController : Controller
    {
        private IGeopointService _geopointSrv;
        private IGeolistService _geolistSrv;
        private IClaimsHelper _helper;

        public GeopointController(IGeopointService geopointSrv,
                                  IGeolistService geolistSrv,
                                  IClaimsHelper helper)
        {
            _geopointSrv = geopointSrv;
            _geolistSrv = geolistSrv;
            _helper = helper;
        }

        // GET api/Geopoint
        [HttpGet]
        public IActionResult GetPoints(string ListId)
        {
            if (_geolistSrv.Get(x => x.Id == Guid.Parse(ListId)) == null)
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }
            var result = _geopointSrv.Get(x => x.GeoListId == Guid.Parse(ListId));
            return Ok(result);
        }

        // GET api/geolist/{ListId}/geopoint/{Id}
        [HttpGet]
        [Route("{Id}")]
        public IActionResult GetPoint(string ListId, string Id)
        {
            if (_geolistSrv.Get(x => x.Id == Guid.Parse(ListId)) == null)
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            var result = _geopointSrv.Get(x => x.Id == Guid.Parse(Id) && x.GeoListId == Guid.Parse(ListId)).FirstOrDefault();

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // POST api/geolist/{ListId}/geopoint/
        [HttpPost]
        public IActionResult AddPoint(string ListId, [FromBody]GeoPoint item)
        {
            if (_geolistSrv.Get(x => x.Id == Guid.Parse(ListId)) == null)
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            item.GeoListId = Guid.Parse(ListId);
            var result = _geopointSrv.Add(item);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // PUT api/geolist/{ListId}/geopoint/{Id}
        [HttpPut]
        [Route("{Id}")]
        public IActionResult EditPoint(string ListId, string Id, [FromBody]GeoPoint item)
        {
            if (_geolistSrv.Get(x => x.Id == Guid.Parse(ListId)) == null)
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            if (Guid.Parse(Id) != item.Id)
            {
                return BadRequest(new OperationResult
                {
                    Data = item,
                    Messages = new[] { "Request ID isn`t equal target object`s ID" },
                    Success = false
                });
            }

            if (!_geopointSrv.Get(x => x.Id == Guid.Parse(Id)).Any())
            {
                return NotFound(new OperationResult
                {
                    Messages = new[] { "Object with requested ID does`t exists" },
                    Success = false
                });
            }

            var result = _geopointSrv.Update(item);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/geolist/{ListId}/geopoint/
        [HttpDelete]
        public IActionResult RemovePoints(string ListId, string Ids)
        {
            if (_geolistSrv.Get(x => x.Id == Guid.Parse(ListId)) == null)
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            var idList = Ids.Split(new char[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries)
                            .ToArray();

            if (idList != null)
            {

                foreach (var Id in idList)
                {
                    var item = _geopointSrv.Get(x => x.Id == Guid.Parse(Id)).FirstOrDefault();

                    if (item == null)
                    {
                        continue;
                    }

                    var result = _geopointSrv.Delete(item);

                    if (!result.Success)
                    {
                        return StatusCode(500);
                    }
                }
                return Ok(new OperationResult
                {
                    Success = true,
                    Messages = new[] { $"Geopoints with Id-s = [{Ids}] of list with Id = [{ListId}] were removed" },
                    Data = Ids
                });
            }
            return BadRequest($"Something is wrong in IDs string: [{Ids}]");
        }

        // DELETE api/geolist/{ListId}/geopoint/{Id}
        [HttpDelete]
        [Route("{Id}")]
        public IActionResult RemovePoint(string ListId, string Id)
        {
            if (_geolistSrv.Get(x => x.Id == Guid.Parse(ListId)) == null)
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            var item = _geopointSrv.Get(x => x.Id == Guid.Parse(Id)).FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }

            var result = _geopointSrv.Delete(item);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // PUT api/geolist/{ListId}/geopoint/{Id}/check
        [HttpPut]
        [Route("{Id}/check")]
        public IActionResult CheckIn(string ListId, string Id, [FromBody]GeoPoint item)
        {
            if (_geolistSrv.Get(x => x.Id == Guid.Parse(ListId)) == null)
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            var userId = _helper.GetUserIdByClaims(User.Claims);

            var result = _geopointSrv.CheckPoint(item, userId);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
