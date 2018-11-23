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

        // GET api/sharng
        [HttpGet]
        public IActionResult GetAllSharedLists()
        {
            var userId = _helper.GetAppUserIdByClaims(User.Claims);

            return Ok(_shareSrv.GetSharedLists(x => x.UserId == userId));
        }

        // GET api/sharng
        [HttpGet]
        [Route("new")]
        public IActionResult GetNewSharedLists()
        {
            var userId = _helper.GetAppUserIdByClaims(User.Claims);

            return Ok(_shareSrv.GetSharedLists(x => x.UserId == userId && 
                                                    x.Status == "pending"));
        }

        // GET api/sharng
        [HttpGet]
        [Route("accepted")]
        public IActionResult GetAcceptedSharedLists()
        {
            var userId = _helper.GetAppUserIdByClaims(User.Claims);

            return Ok(_shareSrv.GetSharedLists(x => x.UserId == userId &&
                                                    x.Status == "accepted"));
        }

        // DELETE api/sharing/{sharingId}
        [HttpDelete]
        [Route("{sharingId}")]
        public IActionResult RefuseSharing(string sharingId)
        {
            var result = _shareSrv.DeleteSharing(_helper.GetAppUserIdByClaims(User.Claims), sharingId);

            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Messages.Contains("Unauthorized"))
            {
                return Unauthorized();
            }

            return BadRequest(result);
        }

        // POST api/sharing/invite/{sharingId}
        [HttpPost]
        [Route("invite/{sharingId}")]
        public IActionResult AcceptInvite(string sharingId)
        {
            var result = _shareSrv.AcceptSharingInvite(_helper.GetAppUserIdByClaims(User.Claims), sharingId);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/sharing/invite/{sharingId}
        [HttpDelete]
        [Route("invite/{sharingId}")]
        public IActionResult RefuseInvite(string sharingId)
        {
            var result = _shareSrv.DeclineSharingInvite(_helper.GetAppUserIdByClaims(User.Claims), sharingId);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
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
