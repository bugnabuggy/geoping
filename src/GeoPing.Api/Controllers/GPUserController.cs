using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;

namespace GeoPing.Api.Controllers
{
    [Route("api/users")]
    [Authorize]
    public class GPUserController : Controller
    {
        private IGPUserService _gpUserSrv;

        public GPUserController(IGPUserService gpUserSrv)
        {
            _gpUserSrv = gpUserSrv;
        }

        // GET api/users
        [HttpGet]
        public IActionResult GetUsers(string firstLetters)
        {
            var result = _gpUserSrv.GetUsersNameAndEmail(firstLetters);

            return Ok(result);
        }
    }
}
