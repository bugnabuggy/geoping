using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;

namespace GeoPing.Api.Controllers
{
    [Route("api/autocomplete")]
    [Authorize]
    public class AutocompleteController : Controller
    {
        private IGPUserService _gpUserSrv;

        public AutocompleteController(IGPUserService gpUserSrv)
        {
            _gpUserSrv = gpUserSrv;
        }

        // GET api/users
        [HttpGet]
        [Route("users")]
        public IActionResult GetUsers(string query)
        {
            var result = _gpUserSrv.GetUsersNameAndEmail(query);

            return Ok(result);
        }
    }
}
