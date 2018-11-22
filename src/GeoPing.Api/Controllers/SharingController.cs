using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/sharing")]
    [Authorize]
    public class SharingController : Controller
    {
        private ISharingService _shareSrv;
        private IClaimsHelper _helper;

        public SharingController(ISharingService shareSrv,
                                 IClaimsHelper helper)
        {
            _shareSrv = shareSrv;
            _helper = helper;
        }

        // POST api/sharing/{listId}
        [HttpPost]
        [Route("{listId}")]
        public async Task<IActionResult> InviteUsers(string listId, [FromBody]string[] users)
        {
            var result = await _shareSrv.InviteUsersByList(_helper.GetAppUserIdByClaims(User.Claims), listId, users);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet]
        [Route("allowed-users")]
        public IActionResult GetAllowedUsers(string listId)
        {
            var result = _shareSrv.GetAllowedUsers(_helper.GetAppUserIdByClaims(User.Claims), listId);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
