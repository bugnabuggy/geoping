using GeoPing.Api.Interfaces;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist/{ListId}/sharing")]
    [Authorize]
    public class SharingController : Controller
    {
        private ISharingService _shareSrv;
        private ISecurityService _securitySrv;
        private IClaimsHelper _helper;
        private IGeolistService _listSrv;

        public SharingController(ISharingService shareSrv,
                                 ISecurityService securitySrv,
                                 IClaimsHelper helper,
                                 IGeolistService listSrv)
        {
            _shareSrv = shareSrv;
            _securitySrv = securitySrv;
            _helper = helper;
            _listSrv = listSrv;
        }

        [HttpGet]
        [Route("allowed-users")]
        public IActionResult GetAllowedUsers(string listId)
        {
            var isListExist = _listSrv.IsListExistWithThisId(listId, out var list);
            if (!isListExist)
            {
                return BadRequest($"There is no list with id = [{listId}]");
            }

            var isUserAllowed = _securitySrv.IsUserHasAccessToList(_helper.GetAppUserIdByClaims(User.Claims), list);
            if (!isUserAllowed)
            {
                return StatusCode(401, "You are not allowed to do this");
            }

            var result = _securitySrv.GetUsersHaveAccessToList(list);

            return Ok(result);
        }
    }
}
