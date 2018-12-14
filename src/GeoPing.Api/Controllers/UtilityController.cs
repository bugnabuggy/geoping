using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Route("api/utility")]
    public class UtilityController: Controller
    {
        private IUtilityService _utilitySrv;

        public UtilityController(IUtilityService utilitySrv)
        {
            _utilitySrv = utilitySrv;
        }

        // GET api/utility/countries
        [HttpGet]
        [Route("countries")]
        public IActionResult GetCountries()
        {
            return Ok(_utilitySrv.GetCountries());
        }

        // GET api/utility/timezones
        [HttpGet]
        [Route("timezones")]
        public IActionResult GetTimeZones()
        {
            return Ok(_utilitySrv.GetTimeZones());
        }
    }
}
