using GeoPing.Api.Interfaces;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GeoPing.Api.Controllers
{
    [Authorize]
    [Route("account")]
    public class AccountController : Controller
    {
        private IAccountService _accountSrv;
        private UserManager<AppIdentityUser> _userManager;
        private ApplicationSettings _settings;
        private IClaimsHelper _helper;

        public AccountController
            (IAccountService accountSrv,
            UserManager<AppIdentityUser> userManager,
            IOptions<ApplicationSettings> settings,
            IClaimsHelper helper)
        {
            _accountSrv = accountSrv;
            _userManager = userManager;
            _settings = settings.Value;
            _helper = helper;
        }

        // POST /account/register
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterUserDTO registerUser)
        {
            var result = new OperationResult();

            if (ModelState.IsValid)
            {
                result = await _accountSrv.RegisterAsync(registerUser);
            }
            else
            {
                result = new OperationResult()
                {
                    Data = registerUser,
                    Messages = new string[] { "Model is invalid" }
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
            var result = await _accountSrv.ResetRassword(form);

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
