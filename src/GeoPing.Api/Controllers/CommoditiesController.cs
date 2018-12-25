using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Route("api/commodities")]
    public class CommoditiesController: Controller
    {
        private ICommodityService _commoditySrv;

        public CommoditiesController(ICommodityService commoditySrv)
        {
            _commoditySrv = commoditySrv;
        }

        public IActionResult GetCommoditiesList()
        {
            return Ok(_commoditySrv.Get());
        }
    }
}
