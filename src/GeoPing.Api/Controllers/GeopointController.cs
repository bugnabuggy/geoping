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
    [Route("api/geolist/{ListId}/geopoint")]
    [Authorize]
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

        // GET api/geolist/{ListId}/geopoint
        [HttpGet]
        public IActionResult GetPointsByFilter(string ListId, GeopointFilterDTO filter)
        {
            if (!_geolistSrv.IsListExistWithThisId(ListId, out GeoList list))
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            var result = _geopointSrv.GetByFilter(list.Id, filter, out int totalItems);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        
        // GET api/geolist/{ListId}/geopoint/{Id}
        [HttpGet]
        [Route("{Id}")]
        public IActionResult GetPoint(string ListId, string Id)
        {
            if (!_geolistSrv.IsListExistWithThisId(ListId, out GeoList list))
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            if (!_geopointSrv.IsPointExistWithThisId(Id, list.Id, out GeoPoint point))
            {
                return BadRequest($"There is no point with Id = [{Id}] in list with Id = [{ListId}].");
            }

            return Ok(point);
        }

        // POST api/geolist/{ListId}/geopoint/
        [HttpPost]
        public IActionResult AddPoint(string ListId, [FromBody]GeopointDTO item)
        {
            if (!_geolistSrv.IsListExistWithThisId(ListId, out GeoList list))
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            var point = new GeoPoint()
            {
                Address = item.Address,
                Description = item.Description,
                Latitude = item.Latitude,
                Longitude = item.Longitude,
                Name = item.Name,
                Radius = item.Radius,
                ListId = list.Id
            };

            var result = _geopointSrv.Add(point);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // PUT api/geolist/{ListId}/geopoint/{Id}
        [HttpPut]
        [Route("{Id}")]
        public IActionResult EditPoint(string ListId, string Id, [FromBody]GeopointDTO item)
        {
            if (!_geolistSrv.IsListExistWithThisId(ListId, out GeoList list))
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            if (!_geopointSrv.IsPointExistWithThisId(Id, list.Id, out GeoPoint point))
            {
                return BadRequest($"There is no point with Id = [{Id}] in list with Id = [{ListId}].");
            }

            point.Latitude = item.Latitude;
            point.Longitude = item.Longitude;
            point.Name = item.Name;
            point.Radius = item.Radius;
            point.Address = item.Address;
            point.Description = item.Description;

            var result = _geopointSrv.Update(point);

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
            if (!_geolistSrv.IsListExistWithThisId(ListId, out GeoList list))
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            var result = _geopointSrv.Delete(Ids);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/geolist/{ListId}/geopoint/{Id}
        [HttpDelete]
        [Route("{Id}")]
        public IActionResult RemovePoint(string ListId, string Id)
        {
            if (!_geolistSrv.IsListExistWithThisId(ListId, out GeoList list))
            {
                return BadRequest($"There is no list with Id = [{ListId}].");
            }

            if (!_geopointSrv.IsPointExistWithThisId(Id, list.Id, out GeoPoint point))
            {
                return BadRequest($"There is no point with Id = [{Id}] in list with Id = [{ListId}].");
            }

            var result = _geopointSrv.Delete(point);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
