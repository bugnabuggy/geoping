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

                    SendSecurityEmail(appUser, code, "ConfirmEmail", "Email confirmation");
                }
                else
                {
                    await _accountSrv.ConfirmAccountWithoutEmailAsync(registerUser.Email);
                }
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/changepassword
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Route("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordDTO changePassword)
        {
            var result = await _accountSrv.ChangePasswordAsync(_helper.GetIdentityUserIdByClaims(User.Claims), changePassword);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // POST /account/resetpassword
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Route("resetPassword")]
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

            SendSecurityEmail(user, code, "ConfirmReset", "Password reset");

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
                return Ok();
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

        // GET /account/confirmemail
        [HttpGet]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Route("confirmEmail")]
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

        // POST /account/confirmreset
        [HttpGet]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Route("confirmReset")]
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

        /*
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");
                    return RedirectToLocal(returnUrl);
                }
                if (result.RequiresTwoFactor)
                {
                    return RedirectToAction(nameof(LoginWith2fa), new { returnUrl, model.RememberMe });
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("User account locked out.");
                    return RedirectToAction(nameof(Lockout));
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return View(model);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWith2fa(bool rememberMe, string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var model = new LoginWith2faViewModel { RememberMe = rememberMe };
            ViewData["ReturnUrl"] = returnUrl;

            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginWith2fa(LoginWith2faViewModel model, bool rememberMe, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var authenticatorCode = model.TwoFactorCode.Replace(" ", string.Empty).Replace("-", string.Empty);

            var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(authenticatorCode, rememberMe, model.RememberMachine);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID {UserId} logged in with 2fa.", user.Id);
                return RedirectToLocal(returnUrl);
            }
            else if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                _logger.LogWarning("Invalid authenticator code entered for user with ID {UserId}.", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid authenticator code.");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithRecoveryCode(string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            ViewData["ReturnUrl"] = returnUrl;

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginWithRecoveryCode(LoginWithRecoveryCodeViewModel model, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var recoveryCode = model.RecoveryCode.Replace(" ", string.Empty);

            var result = await _signInManager.TwoFactorRecoveryCodeSignInAsync(recoveryCode);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID {UserId} logged in with a recovery code.", user.Id);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                _logger.LogWarning("Invalid recovery code entered for user with ID {UserId}", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid recovery code entered.");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout()
        {
            return View();
        }
        
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ErrorMessage = $"Error from external provider: {remoteError}";
                return RedirectToAction(nameof(Login));
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(Login));
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in with {Name} provider.", info.LoginProvider);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ViewData["ReturnUrl"] = returnUrl;
                ViewData["LoginProvider"] = info.LoginProvider;
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                return View("ExternalLogin", new ExternalLoginViewModel { Email = email });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ExternalLoginConfirmation(ExternalLoginViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await _signInManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    throw new ApplicationException("Error loading external login information during confirmation.");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await _userManager.AddLoginAsync(user, info);
                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        _logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewData["ReturnUrl"] = returnUrl;
            return View(nameof(ExternalLogin), model);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userId}'.");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToAction(nameof(ForgotPasswordConfirmation));
                }

                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.ResetPasswordCallbackLink(user.Id, code, Request.Scheme);
                await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                return RedirectToAction(nameof(ForgotPasswordConfirmation));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string code = null)
        {
            if (code == null)
            {
                throw new ApplicationException("A code must be supplied for password reset.");
            }
            var model = new ResetPasswordViewModel { Code = code };
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            AddErrors(result);
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }


        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }
        */

    }
}
