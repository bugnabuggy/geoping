using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Authorize]
    [Route("account")]
    public class AccountController : Controller
    {
        private IAccountService _accountSrv;
        private IClaimsHelper _helper;

        public AccountController
            (IAccountService accountSrv,
            IClaimsHelper helper)
        {
            _accountSrv = accountSrv;
            _helper = helper;
        }

        // POST /account/register
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterUserDTO registerUser)
        {
            OperationResult result;

            if (ModelState.IsValid)
            {
                result = await _accountSrv.RegisterAsync(registerUser);
            }
            else
            {
                result = new OperationResult
                {
                    Data = registerUser,
                    Messages = new[] { "Model is invalid" }
                };
            }

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/change-password
        [HttpPost]
        [Route("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordDTO changePassword)
        {
            var result = await _accountSrv.ChangePasswordAsync
                (_helper.GetIdentityUserIdByClaims(User.Claims), changePassword);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/reset-password
        [HttpPost]
        [AllowAnonymous]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPasswordRequest([FromBody]ResetPasswordDTO form)
        {
            var result = await _accountSrv.ResetPassword(form);

            if (result.Success)
            {
                return Ok(result); 
            }

            return BadRequest(result);
        }

        // GET /account/profile
        [HttpGet]
        [Route("profile")]
        public IActionResult GetProfile()
        {
            var result = _accountSrv.GetProfile(_helper.GetAppUserIdByClaims(User.Claims));
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // PUT /account/profile
        [HttpPut]
        [Route("profile")]
        public IActionResult EditProfile([FromBody]GeoPingUserDTO user)
        {
            var result = _accountSrv.EditProfile(_helper.GetAppUserIdByClaims(User.Claims), user);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // PUT /account/profile/avatar
        [HttpPut]
        [Route("profile/avatar")]
        public IActionResult EditAvatarImage([FromBody]ProfileAvatarDTO avatar)
        {
            var result = _accountSrv.EditProfileAvatar(_helper.GetAppUserIdByClaims(User.Claims), avatar);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // GET /account/profile/short
        [HttpGet]
        [Route("profile/short")]
        public IActionResult GetShortProfile()
        {
            var userId = _helper.GetAppUserIdByClaims(User.Claims);
            var result = _accountSrv.GetShortProfile(userId);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // GET /account/confirm-email
        [HttpGet]
        [AllowAnonymous]
        [Route("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
                return BadRequest("There is no given validation data");
            }

            var result = await _accountSrv.ConfirmEmailAsync(userId, token);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/confirm-reset
        [HttpPost]
        [AllowAnonymous]
        [Route("confirm-reset")]
        public async Task<IActionResult> ConfirmReset(string userId, string token, [FromBody]NewPasswordDTO item)
        {
            if (userId == null || token == null)
            {
                return BadRequest("There is no given validation data");
            }

            var result = await _accountSrv.ConfirmResetAsync(userId, token, item.NewPassword);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
