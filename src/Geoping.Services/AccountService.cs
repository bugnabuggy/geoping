using System;
using System.Linq;
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
            // Checking if there is another user with given Email and UserName
            if (IsUserExists(registerUser, out string item))
            {
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

            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account: " +
                                       $"Email = [{user.Email}], " +
                                       $"Username = [{user.UserName}].");

                var gpUser = _gpUserSrv.AddGPUserForIdentity(user.Id, user.Email, user.UserName);

                // Token actions

                if (registerUser.Token != null)
                {
                    var token = _tokenSrv.GetToken(registerUser.Token);

                    if (token != null)
                    {
                        switch (token.Type)
                        {
                            case "SharingInvite":
                                {
                                    _sharingSrv.ConfirmSharingWithRegistration
                                        (token.Value, gpUser.Id, user.Email);

                                    _tokenSrv.MarkAsUsed(token.Token);

                                    break;
                                }
                        }
                    }
                }

                var aspnetToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                var code = _tokenSrv.CreateConfirmationEmailToken(user.Id, aspnetToken).Token;

                if (_settings.EmailSender.IsEmailConfirmEnable)
                {
                    SendSecurityEmail(user, code, "ConfirmEmail", "Registration on GeoPing.info");
                }
                else
                {
                    await _userManager.ConfirmEmailAsync(user, aspnetToken);

                    await ConfirmAccountWithoutEmailAsync(registerUser.Email);
                }

                return new OperationResult
                {
                    Success = true,
                    Messages = new[] { "User was successfully registered, now he should validate his " +
                                       "account according instructions were sent to provided email address" }
                };
            }

            // If we got this far, something failed
            return new OperationResult
            {
                Success = false,
                Messages = new[] { "Something was failed while user registration" }
            };
        }

        public async Task<OperationResult> ChangePasswordAsync(string identityUserId, ChangePasswordDTO changePassword)
        {
            var user = await _userManager.FindByIdAsync(identityUserId);

            var result = await _userManager.ChangePasswordAsync
                (user, changePassword.OldPassword, changePassword.NewPassword);

            if (result.Succeeded)
            {
                return new OperationResult
                {
                    Success = true,
                    Messages = new[] { "Password was changed successfully" }
                };
            }
            return new OperationResult
            {
                Success = false,
                Messages = new[] { "There was fault while changing password. Check if the old password is correct" }
            };
        }

        public async Task<OperationResult> ResetPassword(ResetPasswordDTO form)
        {
            var user = await _userManager.FindByEmailAsync(form.UserData);

            if (user == null)
            {
                user = await _userManager.FindByNameAsync(form.UserData);

                if (user == null)
                {
                    return new OperationResult
                    {
                        Messages = new[] { "There is no user with given login or email" }
                    };
                }
            }

            var aspnetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            var code = _tokenSrv.CreateConfirmationResetToken(user.Id, aspnetToken).Token;

            SendSecurityEmail(user, code, "ConfirmReset", "Password reset");

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "A password reset confirmation email has been sent to email address you specified" }
            };
        }

        public async Task<OperationResult> ConfirmEmailAsync(string token)
        {
            var isTokenExist = _tokenSrv.TryGetToken(token, out GeoPingToken gpToken);

            if (!isTokenExist)
            {
                return new OperationResult
                {
                    Messages = new[] { "Invalid token" }
                };
            }

            var tokenValidationResult = _tokenSrv.ValidateGPToken(gpToken);
            if (tokenValidationResult != null)
            {
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

            var user = await _userManager.FindByIdAsync(data.UserId);
            if (user == null)
            {
                return new OperationResult
                {
                    Data = data.UserId,
                    Messages = new[] { $"There is no user with UserID = [{data.UserId}]" }
                };
            }

            var result = await _userManager.ConfirmEmailAsync(user, data.Token);

            if (!result.Succeeded)
            {
                return new OperationResult
                {
                    Data = result.Errors,
                    Messages = new[] { "Something went wrong while email confirmation. Try again later" }
                };
            }

            _gpUserSrv.ActivateUser(user.Id);

            _tokenSrv.MarkAsUsed(data.Token);

            return new OperationResult
            {
                Success = true,
                Messages = new[] { $"User with Id = [{data.UserId}] has been confirmed successfully" }
            };
        }

        public async Task<OperationResult> ConfirmResetAsync(string token, string newPassword)
        {
            var isTokenExist = _tokenSrv.TryGetToken(token, out GeoPingToken gpToken);

            if (!isTokenExist)
            {
                return new OperationResult
                {
                    Messages = new[] { "Invalid token" }
                };
            }

            var tokenValidationResult = _tokenSrv.ValidateGPToken(gpToken);
            if (tokenValidationResult != null)
            {
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

            var user = await _userManager.FindByIdAsync(data.UserId);
            if (user == null)
            {
                return new OperationResult
                {
                    Data = data.UserId,
                    Messages = new[] { $"There is no user with UserID = [{data.UserId}]" }
                };
            }

            var result = await _userManager.ResetPasswordAsync(user, data.Token, newPassword);

            if (!result.Succeeded)
            {
                return new OperationResult
                {
                    Messages = new[] { "Something went wrong while password reset. Try again later" }
                };
            }

            _gpUserSrv.ActivateUser(user.Id);

            _tokenSrv.MarkAsUsed(data.Token);

            return new OperationResult
            {
                Success = true,
                Messages = new[] { $"User`s password with Id = [{data.UserId}] has been reset successfully" }
            };
        }

        public async Task ConfirmAccountWithoutEmailAsync(string userEmail)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);

            user.EmailConfirmed = true;

            _gpUserSrv.ActivateUser(user.Id);
        }

        public OperationResult<GeoPingUser> GetProfile(Guid gpUserId)
        {
            var result = _gpUserSrv.GetUser(x => x.Id == gpUserId);

            if (result == null)
            {
                return new OperationResult<GeoPingUser>
                {
                    Messages = new[] { "User was not found" }
                };
            }

            return new OperationResult<GeoPingUser>
            {
                Data = result,
                Messages = new[] { "The following user was found" },
                Success = true
            };
        }

        public OperationResult<ShortUserInfoDTO> GetShortProfile(Guid gpUserId)
        {
            var result = _gpUserSrv.GetUserNameAndAvatar(x => x.Id == gpUserId);

            if (result == null)
            {
                return new OperationResult<ShortUserInfoDTO>
                {
                    Messages = new[] { "User was not found" }
                };
            }
            return new OperationResult<ShortUserInfoDTO>
            {
                Data = result,
                Messages = new[] { "The following user was found" },
                Success = true
            };
        }

        public OperationResult<GeoPingUser> EditProfile(Guid userId, GeoPingUserDTO userData)
        {
            var user = _gpUserSrv.GetUser(x => x.Id == userId);

            user.FirstName = userData.FirstName;
            user.LastName = userData.LastName;
            user.Birthday = userData.Birthday;
            user.PhoneNumber = userData.PhoneNumber;

            var result = _gpUserSrv.EditUser(user);

            if (result.Success)
            {
                return new OperationResult<GeoPingUser>
                {
                    Data = user,
                    Success = true,
                    Messages = new[] { "Your profile was edited successfully" }
                };
            }

            return new OperationResult<GeoPingUser>
            {
                Messages = new[] { "Profile you are trying to edit is not yours or something went wrong while editing" }
            };
        }

        public OperationResult<GeoPingUser> EditProfileAvatar(Guid userId, ProfileAvatarDTO item)
        {
            if (item != null)
            {
                var user = _gpUserSrv.GetUser(x => x.Id == userId);

                user.Avatar = item.Avatar ?? DefaultUserSettings.AvatarImage;

                var result = _gpUserSrv.EditUser(user);

                if (result.Success)
                {
                    return new OperationResult<GeoPingUser>
                    {
                        Data = user,
                        Success = true,
                        Messages = new[] { "Your profile avatar was edited successfully" }
                    };
                }
            }

            return new OperationResult<GeoPingUser>
            {
                Messages = new[] { "Profile you are trying to edit is not yours or something went wrong while editing" }
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
            var baseUrl = _settings.Urls.SiteUrl;

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

            string callbackUrl = $"{baseUrl}/{actionEndpoint}?Token={code}";
            //====================================================================================

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
    }
}
