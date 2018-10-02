using GeoPing.Api.Interfaces;
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
    [Route("api/Geopoint")]
    public class GeopointController : Controller
    {
        private IGeopointService _geopointSrv;

        public GeopointController(IGeopointService geopointSrv)
        {
            this._geopointSrv = geopointSrv;
        }

        // GET api/Geopoint
        [HttpGet]
        public IActionResult GetPoints()
        {
            var result = this._geopointSrv.Get();
            return Ok(result);
        }

        // GET api/Geopoint/{Id}
        [HttpGet]
        [Route("{Id}")]
        public IActionResult GetPoint(int Id)
        {
            var result = this._geopointSrv.Get(x => x.Id == Id).FirstOrDefault();

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // POST api/Geopoint/
        [HttpPost]
        public IActionResult AddPoint([FromBody]GeoPoint item)
        {
            var result = _geopointSrv.Add(item);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // TODO: Remake this
        // PUT api/Geopoint/{Id}
        [HttpPut]
        [Route("{Id}")]
        public IActionResult EditPoint(int Id, [FromBody]GeoPoint item)
        {
            if (Id != item.Id)
            {
                return BadRequest(new OperationResult
                {
                    Data = item,
                    Messages = new[] {"Request ID isn`t equal target object`s ID"},
                    Success = false
                });
            }

            if (!_geopointSrv.Get(x => x.Id == Id).Any())
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

        // DELETE api/Geopoint/
        //
        // Ids string looks like array of integers, divided with commas and/or spaces
        // Example: "1, 10, 11, 100"
        //
        [HttpDelete]
        public IActionResult RemovePoints([FromBody]string Ids)
        {
            var idList = Ids.Split(new char[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries)
                            .Select(int.Parse)
                            .ToArray();
            if (idList != null)
            {

                foreach (var Id in idList)
                {
                    var item = this._geopointSrv.Get(x => x.Id == Id).FirstOrDefault();

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
                return NoContent();
            }
            return BadRequest($"Something is wrong in IDs string: [{Ids}]");
        }

        // DELETE api/Geopoint/{Id}
        [HttpDelete]
        [Route("{Id}")]
        public IActionResult RemovePoint(int Id)
        {
            var item = this._geopointSrv.Get(x => x.Id == Id).FirstOrDefault();

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
    }
}
