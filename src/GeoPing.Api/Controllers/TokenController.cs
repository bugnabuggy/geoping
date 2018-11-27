using System.Linq;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/token")]
    public class TokenController : Controller
    {
        private IGeopingTokenService _gpTokenSrv;
        private IClaimsHelper _helper;
        private ISharingService _sharingSrv;

        public TokenController
            (ISharingService sharingSrv,
            IGeopingTokenService gpTokenSrv,
            IClaimsHelper helper)
        {
            _sharingSrv = sharingSrv;
            _helper = helper;
            _gpTokenSrv = gpTokenSrv;
        }

        // GET api/token/{tokenId}
        [HttpGet]
        [Route("{token}")]
        public IActionResult ExamineToken(string token)
        {
            var result = _gpTokenSrv.ExamineToken(token);

            if (result.Success)
            {
                return Ok(result);
            }

            if (result.Messages.Any(x => new[] {"Used", "Expired"}.Any(y => x == y)))
            {
                return StatusCode(410, "Token was used or expired");
            }

            return NotFound(result);
        }

        // DELETE api/token/{tokenId}
        [HttpDelete]
        [Route("{token}")]
        public IActionResult UseToken(string token)
        {
            var result = _gpTokenSrv.MarkAsUsed(token);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
