using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
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
        private readonly IConfiguration _configuration;
        private readonly IAccountService _accountSrv;
        private readonly IEmailService _emailSvc;
        private UserManager<AppIdentityUser> _userManager;
        private IClaimsHelper _helper;

        public AccountController(IAccountService accountSrv,
                                 IEmailService emailSvc,
                                 UserManager<AppIdentityUser> userManager,
                                 IConfiguration configuration,
                                 IClaimsHelper helper)
        {
            _accountSrv = accountSrv;
            _emailSvc = emailSvc;
            _userManager = userManager;
            _configuration = configuration;
            _helper = helper;
        }

        [TempData]
        public string ErrorMessage { get; set; }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult TestSend()
        {
            try
            {
                _emailSvc.Send(new EmailMessage()
                {
                    FromAddress = new EmailAddress()
                    {
                        Name = "GeopingTeam",
                        Address = "test@geoping.info"
                    },
                    ToAddress = new EmailAddress()
                    {
                        Name = "shefard55r@yandex.ru",
                        Address = "shefard55r@yandex.ru"
                    },
                    Subject = "Email confirmation",
                    Content = "Test"

                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }

        // POST /account/register
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
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
                    Messages = new string[] { "Model is invalid" },
                    Success = false
                };
            }

            if (result.Success)
            {
                var appUser = await _userManager.FindByEmailAsync(registerUser.Email);

                if (_configuration.GetValue<bool>("isEmailConfirmationOn"))
                {
                    var code = _userManager.GenerateEmailConfirmationTokenAsync(appUser).Result;

                    SendSecurityEmail(appUser, code, "confirm-email", "Email confirmation");
                }
                else
                {
                    await _accountSrv.ConfirmAccountWithoutEmailAsync(registerUser.Email);
                }
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/change-password
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Route("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordDTO changePassword)
        {
            var result = await _accountSrv.ChangePasswordAsync(_helper.GetIdentityUserIdByClaims(User.Claims), changePassword);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/reset-password
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPasswordRequest(string loginOrEmail)
        {
            var user = await _userManager.FindByEmailAsync(loginOrEmail);
            if (user == null)
            {
                user = await _userManager.FindByNameAsync(loginOrEmail);
                if (user == null)
                {
                    return BadRequest("There is no user with given login or email");
                }
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);

            SendSecurityEmail(user, code, "confirm-reset", "Password reset");

            return Ok("A password reset confirmation email has been sent to email address you specified");
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
        public IActionResult EditProfile(GeoPingUser user)
        {
            var loggedUserId = _helper.GetAppUserIdByClaims(User.Claims);

            var result = _accountSrv.EditProfile(loggedUserId, user);

            if(result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // GET /account/confirm-email
        [HttpGet]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Route("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
                return BadRequest(new OperationResult { Messages = new[] { "There is no given validation data" } });
            }

            var result = await _accountSrv.ConfirmEmailAsync(userId, token);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/confirm-reset
        [HttpGet]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Route("confirm-reset")]
        public async Task<IActionResult> ConfirmReset(string userId, string token, [FromBody]string newPassword)
        {
            if (userId == null || token == null)
            {
                return BadRequest(new OperationResult { Messages = new[] { "There is no given validation data" } });
            }

            var result = await _accountSrv.ConfirmResetAsync(userId, token, newPassword);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        // Sends security emails for given user with given security token for specified action, 
        // Action field is endpoint of action
        // Subject field is email subject
        private void SendSecurityEmail(AppIdentityUser user, string code, string action, string subject)
        {
            var callbackUrl = Url.Action(action,
                                         "Account",
                                         new { userId = user.Id, code = code },
                                         protocol: HttpContext.Request.Scheme);

            _emailSvc.Send(new EmailMessage()
            {
                FromAddress = new EmailAddress()
                {
                    Name = "GeopingTeam",
                    Address = "noreply@geoping.info"
                },
                ToAddress = new EmailAddress()
                {
                    Name = user.UserName,
                    Address = user.Email
                },
                Subject = subject,
                Content = _emailSvc.GetConfirmationMail(user.UserName, callbackUrl)
            });
        }

        #endregion
    }
}
