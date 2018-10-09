﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.Entities;
using GeoPing.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist")]
    public class GeolistController : Controller
    {
        private IGeolistService _geolistSrv;
        private IHelper _helper;

        public GeolistController(IGeolistService geolistSrv,
                                 IHelper helper)
        {
            _geolistSrv = geolistSrv;
            _helper = helper;
        }

        // GET api/Geolist
        [HttpGet]
        public IActionResult GetLists()
        {
            var result = _geolistSrv.Get();
            return Ok(result);
        }

        // GET api/Geolist/{Id}
        [HttpGet]
        [Route("{Id}")]
        public IActionResult GetList(int Id)
        {
            var result = _geolistSrv.Get(x => x.Id == Id).FirstOrDefault();

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // POST api/Geolist/
        [HttpPost]
        public IActionResult AddList([FromBody]GeoList item)
        {
            item.OwnerId = _helper.GetUserIdByClaims(User.Claims);
            var result = _geolistSrv.Add(item);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // PUT api/Geolist/{Id}
        [HttpPut]
        [Route("{Id}")]
        public IActionResult EditList(int Id, [FromBody]GeoList item)
        {
            if (Id != item.Id)
            {
                return BadRequest(new OperationResult
                {
                    Data = item,
                    Messages = new[] { "Request ID isn`t equal target object`s ID" },
                    Success = false
                });
            }

            if (!_geolistSrv.Get(x => x.Id == Id).Any())
            {
                return NotFound(new OperationResult
                {
                    Messages = new[] { "Object with requested ID does`t exists" },
                    Success = false
                });
            }

            var result = _geolistSrv.Update(item);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/Geolist/
        [HttpDelete]
        public IActionResult RemoveLists(string Ids)
        {
            var idList = Ids.Split(new char[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries)
                            .Select(int.Parse)
                            .ToArray();
            if (idList != null)
            {

                foreach (var Id in idList)
                {
                    var item = _geolistSrv.Get(x => x.Id == Id).FirstOrDefault();

                    if (item == null)
                    {
                        continue;
                    }

                    var result = _geolistSrv.Delete(item);

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

        // DELETE api/Geolist/{Id}
        [HttpDelete]
        [Route("{Id}")]
        public IActionResult RemoveList(int Id)
        {
            var item = _geolistSrv.Get(x => x.Id == Id).FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }

            var result = _geolistSrv.Delete(item);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}