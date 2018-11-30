using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        // GET api/users
        [HttpGet]
        [Route("autocomplete")]
        public IActionResult GetUsers(string query)
        {
            var result = _shareSrv.GetAutoCompletedUsersList(query);

            return Ok(result);
        }

        // GET api/sharing
        [HttpGet]
        public IActionResult GetAllSharedLists()
        {
            var userId = _helper.GetAppUserIdByClaims(User.Claims);

            return Ok(_shareSrv.GetListsSharedWith(userId));
        }

        // GET api/sharing
        [HttpGet]
        [Route("new")]
        public IActionResult GetNewSharedLists()
        {
            var userId = _helper.GetAppUserIdByClaims(User.Claims);

            return Ok(_shareSrv.GetListsSharedWith(userId, "pending"));
        }

        // GET api/sharing
        [HttpGet]
        [Route("accepted")]
        public IActionResult GetAcceptedSharedLists()
        {
            var userId = _helper.GetAppUserIdByClaims(User.Claims);

            return Ok(_shareSrv.GetListsSharedWith(userId, "accepted"));
        }

        // DELETE api/sharing/{sharingId}
        [HttpDelete]
        [Route("{sharingId}")]
        public IActionResult RevokeSharing(string sharingId)
        {
            var result = _shareSrv.RevokeSharing(_helper.GetAppUserIdByClaims(User.Claims), sharingId);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST api/sharing/invitation/{sharingId}
        [HttpPost]
        [Route("invitation/{sharingId}")]
        public IActionResult AcceptInvite(string sharingId)
        {
            var result = _shareSrv.AcceptSharing(_helper.GetAppUserIdByClaims(User.Claims), sharingId);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // DELETE api/sharing/invitation/{sharingId}
        [HttpDelete]
        [Route("invitation/{sharingId}")]
        public IActionResult RefuseInvite(string sharingId)
        {
            var result = _shareSrv.RefuseSharing(_helper.GetAppUserIdByClaims(User.Claims), sharingId);

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
        [Route("{listId}/allowed-users")]
        public IActionResult GetAllowedUsers(string listId)
        {

            //var result = _shareSrv.GetAllowedUsers(_helper.GetAppUserIdByClaims(User.Claims), listId);

            var result = _shareSrv.GetUsersListWasSharedWith(_helper.GetAppUserIdByClaims(User.Claims), listId);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
