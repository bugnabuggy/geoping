using System;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Utilities.EmailSender;
using GeoPing.Utilities.EmailSender.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GeoPing.Services
{
    public class AccountService : IAccountService
    {
        private UserManager<AppIdentityUser> _userManager;
        private ILogger<AccountService> _logger;
        private IGeopingUserService _gpUserSrv;
        private IGeopingTokenService _tokenSrv;
        private ISharingService _sharingSrv;
        private IEmailService _emailSrv;
        private ApplicationSettings _settings;

        public AccountService
            (UserManager<AppIdentityUser> userManager,
            ILogger<AccountService> logger,
            IGeopingUserService gpUserSrv,
            IGeopingTokenService tokenSrv,
            ISharingService sharingSrv,
            IEmailService emailSrv,
            IOptions<ApplicationSettings> settings)
        {
            _userManager = userManager;
            _logger = logger;
            _gpUserSrv = gpUserSrv;
            _tokenSrv = tokenSrv;
            _sharingSrv = sharingSrv;
            _emailSrv = emailSrv;
            _settings = settings.Value;
        }

        public async Task<OperationResult> RegisterAsync(RegisterUserDTO registerUser)
        {
            _logger.LogInformation($"Try to register user with user name = [{registerUser.UserName}]" +
                                   $"and email = [{registerUser.Email}].");

            // Checking if there is another user with given Email and UserName
            if (IsUserExists(registerUser, out string item))
            {
                _logger.LogInformation($"Registration {registerUser.Email}::{registerUser.UserName}" +
                                       $"failed cause of user with the same {item} exists.");

                return new OperationResult
                {
                    Data = registerUser,
                    Success = false,
                    Messages = new[] { $"{item} is invalid or was already taken" }
                };
            }

            // If all checks gone - registering 
            var user = new AppIdentityUser
            {
                UserName = registerUser.UserName,
                Email = registerUser.Email
            };

            var result = await _userManager.CreateAsync(user, registerUser.Password);

            if (!result.Succeeded)
            {
                _logger.LogError($"An error was occured while user registration " +
                                 $"{user.Email}::{user.UserName}: ", result.Errors);
                return new OperationResult
                {
                    Data = result.Errors,
                    Messages = new[] { "Something was failed while user registration" }
                };
            }

            _logger.LogInformation("User created a new account: " +
                                   $"Email = [{user.Email}], " +
                                   $"Username = [{user.UserName}].");

            try
            {
                string[] rolesByDefault = new[] { "user" };

                await _userManager.AddToRolesAsync(user, rolesByDefault);

                _logger.LogDebug($"User[{user.Id}] was added to roles: {string.Join(" | ", rolesByDefault)}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error was occured while addition user[{user.Id}] to roles: ", ex);
            }

            var gpUser = _gpUserSrv.AddGPUserForIdentity(user.Id, user.Email, user.UserName, registerUser.TimeZone);

            _logger.LogInformation($"Geoping user was created for {user.Email}::{gpUser.Id}.");

            // Token actions

            if (_tokenSrv.TryGetToken(registerUser.Token, out var token))
            {
                if (token.Type == "SharingInvite")
                {
                    _sharingSrv.ConfirmSharingsWithRegistration(token.Value, gpUser.Id, user.Email);

                    _tokenSrv.MarkAsUsed(token.Token);
                }

                _logger.LogDebug($"Used invalid token while registration.");
            }

            var aspnetToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            if (_settings.EmailSender.IsEmailConfirmEnable)
            {
                var code = _tokenSrv.CreateConfirmationEmailToken(user.Id, aspnetToken).Token;

                SendSecurityEmail(user, code, "ConfirmEmail", "Registration on GeoPing.info");

                _logger.LogInformation($"User {user.Email}::{user.Id} was successfully registered" +
                                       $"and now there is awaited email confirmation by him.");
            }
            else
            {
                _logger.LogInformation($"User account {user.Email}::{user.Id} was successfully registered" +
                                       $"and now there is awaited automatic confirmation.");

                await _userManager.ConfirmEmailAsync(user, aspnetToken);

                _gpUserSrv.ActivateUser(user.Id);

                _logger.LogInformation($"User account {user.Email}::{user.Id} was automatically confirmed.");
            }

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "User was successfully registered, now he should validate his " +
                                   "account according instructions were sent to provided email address" }
            };
        }

        public async Task<OperationResult> ChangePasswordAsync(string identityUserId, ChangePasswordDTO changePassword)
        {
            var user = await _userManager.FindByIdAsync(identityUserId);

            _logger.LogInformation($"User {user.Email}::{user.Id} has invoked password change.");

            var result = await _userManager.ChangePasswordAsync
                (user, changePassword.OldPassword, changePassword.NewPassword);

            if (!result.Succeeded)
            {
                _logger.LogError("An error was occured while changing password by user " +
                                 $"{user.Email}::{user.Id}: ", result.Errors);

                return new OperationResult
                {
                    Data = result.Errors,
                    Messages = new[] { "There was fault while changing password. Check if the old password is correct" }
                };
            }

            _logger.LogInformation($"User {user.Email}::{user.Id} has changed his password successfully.");

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "Password was changed successfully" }
            };
        }

        public async Task<OperationResult> ResetPassword(ResetPasswordDTO form)
        {
            _logger.LogDebug($"Someone has invoked password reset for user [{form.UserData}].");

            AppIdentityUser user = null;

            try
            {
                user = await _userManager.FindByEmailAsync(form.UserData);
            }
            catch (Exception ex)
            {
                _logger.LogWarning($"There is now registered user with email = [{form.UserData}].", ex);
            }

            if (user == null)
            {
                try
                {
                    user = await _userManager.FindByNameAsync(form.UserData);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning($"There is now registered user with email = [{form.UserData}].", ex);

                    return new OperationResult
                    {
                        Messages = new[] { "There is no user with given login or email", ex.Message }
                    };
                }
            }

            var aspnetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            var code = _tokenSrv.CreateConfirmationResetToken(user.Id, aspnetToken).Token;

            SendSecurityEmail(user, code, "ConfirmReset", "Password reset");

            _logger.LogInformation($"User {user.Email}::{user.Id} has requested password reset.");

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "A password reset confirmation email has been sent " +
                                   "to email address you specified" }
            };
        }

        public async Task<OperationResult> ConfirmEmailAsync(string token)
        {
            _logger.LogDebug("Someone has invoked email confirmation by token.");

            var isTokenExist = _tokenSrv.TryGetToken(token, out GeoPingToken gpToken);

            if (!isTokenExist)
            {
                _logger.LogWarning("Represented email confirmation token is invalid.");

                return new OperationResult
                {
                    Messages = new[] { "Invalid token" }
                };
            }

            var tokenValidationResult = _tokenSrv.ValidateGPToken(gpToken);
            if (tokenValidationResult != null)
            {
                _logger.LogWarning($"Represented email confirmation token is {tokenValidationResult.ToLower()}.");

                return new OperationResult
                {
                    Messages = new[] { $"{tokenValidationResult} token" }
                };
            }

            // TODO: SOLVE TASK ABOUT HOW TO UNPACK CONFIRMATION TOKEN AND REMOVE THIS CRAP
            var valueData = gpToken.Value
                .Split(',', StringSplitOptions.RemoveEmptyEntries);

            var data = new
            {
                UserId = valueData[0],
                Token = valueData[1]
            };
            // END OF CRAP

            AppIdentityUser user = null;

            try
            {
                user = await _userManager.FindByIdAsync(data.UserId);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Token contains information about user with id = [{data.UserId}], " +
                                 $"but user doesn`t exists.");

                return new OperationResult
                {
                    Data = data.UserId,
                    Messages = new[] { $"There is no user with UserID = [{data.UserId}]", ex.Message }
                };
            }

            var result = await _userManager.ConfirmEmailAsync(user, data.Token);

            if (!result.Succeeded)
            {
                _logger.LogError
                    ($"An error occured while email confirmation of user with id = [{user.Id}]: ",
                    result.Errors);

                return new OperationResult
                {
                    Data = result.Errors,
                    Messages = new[] { "Something went wrong while email confirmation. Try again later" }
                };
            }

            _gpUserSrv.ActivateUser(user.Id);

            _tokenSrv.MarkAsUsed(data.Token);

            _logger.LogInformation($"User {user.Email}::{user.Id} has confirmed his account successfully.");

            return new OperationResult
            {
                Success = true,
                Messages = new[] { $"User with Id = [{data.UserId}] has been confirmed successfully" }
            };
        }

        public async Task<OperationResult> ConfirmResetAsync(string token, string newPassword)
        {
            _logger.LogDebug("Someone has invoked password reset confirmation by token.");

            var isTokenExist = _tokenSrv.TryGetToken(token, out GeoPingToken gpToken);

            if (!isTokenExist)
            {
                _logger.LogWarning("Represented email confirmation token is invalid.");

                return new OperationResult
                {
                    Messages = new[] { "Invalid token" }
                };
            }

            var tokenValidationResult = _tokenSrv.ValidateGPToken(gpToken);
            if (tokenValidationResult != null)
            {
                _logger.LogWarning($"Represented email confirmation token is {tokenValidationResult.ToLower()}.");

                return new OperationResult
                {
                    Messages = new[] { $"{tokenValidationResult} token" }
                };
            }

            // TODO: SOLVE TASK ABOUT HOW TO UNPACK CONFIRMATION TOKEN AND REMOVE THIS CRAP
            var valueData = gpToken.Value
                .Split(',', StringSplitOptions.RemoveEmptyEntries);

            var data = new
            {
                UserId = valueData[0],
                Token = valueData[1]
            };
            // END OF CRAP

            AppIdentityUser user = null;

            try
            {
                user = await _userManager.FindByIdAsync(data.UserId);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Token contains information about user with id = [{data.UserId}], " +
                                 $"but user doesn`t exists.", ex);

                return new OperationResult
                {
                    Data = data.UserId,
                    Messages = new[] { $"There is no user with UserID = [{data.UserId}]", ex.Message }
                };
            }

            var result = await _userManager.ResetPasswordAsync(user, data.Token, newPassword);

            if (!result.Succeeded)
            {
                _logger.LogError
                    ($"An error occured while email confirmation of user with id = [{user.Id}]: ",
                    result.Errors);

                return new OperationResult
                {
                    Data = result.Errors,
                    Messages = new[] { "Something went wrong while password reset. Try again later" }
                };
            }

            _gpUserSrv.ActivateUser(user.Id);

            _tokenSrv.MarkAsUsed(data.Token);

            _logger.LogInformation($"User {user.Email}::{user.Id} has reset his password successfully .");

            return new OperationResult
            {
                Success = true,
                Messages = new[] { $"User`s password with Id = [{data.UserId}] has been reset successfully" }
            };
        }

        public OperationResult<GeoPingUser> GetProfile(Guid gpUserId)
        {
            _logger.LogDebug($"Profile of Geoping user with id = [{gpUserId}] was requested.");

            var result = _gpUserSrv.GetUser(x => x.Id == gpUserId);

            if (result == null)
            {
                _logger.LogDebug($"Profile of Geoping user with id = [{gpUserId}] request was failed: " +
                                 $"user was not found.");

                return new OperationResult<GeoPingUser>
                {
                    Messages = new[] { "User was not found" }
                };
            }

            _logger.LogDebug($"Profile of Geoping user with id = [{gpUserId}] request was successful.");

            return new OperationResult<GeoPingUser>
            {
                Data = result,
                Messages = new[] { "The following user was found" },
                Success = true
            };
        }

        public async Task<OperationResult<ShortUserInfoDTO>> GetShortProfile(string gpUserId)
        {
            _logger.LogDebug($"Short profile info of Geoping user with id = [{gpUserId}] was requested.");

            var result = await _gpUserSrv.GetUserCommonInfo(gpUserId);

            if (result == null)
            {
                _logger.LogDebug($"Short profile info of Geoping user with id = [{gpUserId}] " +
                                 $"request was failed: user was not found.");

                return new OperationResult<ShortUserInfoDTO>
                {
                    Messages = new[] { "User was not found" }
                };
            }

            _logger.LogDebug($"Short profile info of Geoping user with id = [{gpUserId}] request was successful.");

            return new OperationResult<ShortUserInfoDTO>
            {
                Data = result,
                Messages = new[] { "The following user was found" },
                Success = true
            };
        }

        public OperationResult<GeoPingUser> EditProfile(Guid userId, GeoPingUserDTO userData)
        {
            _logger.LogInformation($"Geoping user with id = [{userId}] has requested profile editing.");

            var user = _gpUserSrv.GetUser(x => x.Id == userId);

            user.FirstName = userData.FirstName;
            user.LastName = userData.LastName;
            user.Birthday = userData.Birthday;
            user.PhoneNumber = userData.PhoneNumber;
            user.Country = userData.Country;
            user.TimeZone = userData.TimeZone;

            var result = new OperationResult<GeoPingUser>();

            try
            {
                _gpUserSrv.EditUser(user);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while editing profile of Geoping user with id = [{userId}].", ex);

                return new OperationResult<GeoPingUser>
                {
                    Messages = new[] { "Something went wrong while editing profile.", ex.Message }
                };
            }

            _logger.LogInformation($"Profile of Geoping user with id = [{userId}] has been edited.");

            return new OperationResult<GeoPingUser>
            {
                Data = user,
                Success = true,
                Messages = new[] { "Your profile was edited successfully" }
            };
        }

        public OperationResult<GeoPingUser> EditProfileAvatar(Guid userId, ProfileAvatarDTO item)
        {
            _logger.LogInformation($"Geoping user with id = [{userId}] has requested avatar editing.");

            var result = new OperationResult<GeoPingUser>();

            var user = _gpUserSrv.GetUser(x => x.Id == userId);

            try
            {
                user.Avatar = item.Avatar ?? DefaultUserSettings.AvatarImage;

                result = _gpUserSrv.EditUser(user);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while editing avatar of Geoping user with id = [{userId}].", ex);

                return new OperationResult<GeoPingUser>
                {
                    Messages = new[] { "Something went wrong while avatar editing.", ex.Message }
                };
            }

            _logger.LogInformation($"Avatar of Geoping user with id = [{userId}] has been edited successfully.");

            return new OperationResult<GeoPingUser>
            {
                Data = user,
                Success = true,
                Messages = new[] { "Your profile avatar was edited successfully" }
            };
        }

        public bool IsUserExists(RegisterUserDTO user, out string item)
        {
            if (_userManager.FindByEmailAsync(user.Email).Result != null)
            {
                item = "Email";
                return true;
            }

            if (_userManager.FindByNameAsync(user.UserName).Result != null)
            {
                item = "UserName";
                return true;
            }
            item = "";
            return false;
        }

        public bool IsUserExists(string userId)
        {
            if (_userManager.FindByIdAsync(userId).Result != null)
            {
                return true;
            }
            return false;
        }

        private void SendSecurityEmail(AppIdentityUser user, string code, string action, string subject)
        {
            // TODO: CAN I MAKE THIS PART BETTER WITHOUT SPEED LOSS?
            //====================================================================================
            string actionEndpoint = null;

            switch (action)
            {
                case "ConfirmEmail":
                    actionEndpoint = _settings.Urls.ActionsUrl.ConfirmEmail;
                    break;

                case "ConfirmReset":
                    actionEndpoint = _settings.Urls.ActionsUrl.ConfirmReset;
                    break;
            }

            string callbackUrl = $"{_settings.Urls.SiteUrl}/" +
                                 $"{actionEndpoint}" +
                                 $"?Token={code}";
            //====================================================================================

            try
            {
                _emailSrv.Send(new EmailMessage
                {
                    FromAddress = new EmailAddress
                    {
                        Name = "GeopingTeam",
                        Address = _settings.EmailSender.SmtpUserName
                    },
                    ToAddress = new EmailAddress
                    {
                        Name = user.UserName,
                        Address = user.Email
                    },
                    Subject = subject,
                    Content = _emailSrv.GetConfirmationMail(user.UserName, callbackUrl)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while sending confirmation email to [{user.Email}].", ex);
            }
        }
    }
}
