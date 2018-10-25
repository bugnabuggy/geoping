using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Geoping.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly ILogger<AccountService> _logger;
        private IGPUserService _gpUserSrv;

        public AccountService(UserManager<AppIdentityUser> userManager,
                              ILogger<AccountService> logger,
                              IGPUserService gpUserSrv)
        {
            _userManager = userManager;
            _logger = logger;
            _gpUserSrv = gpUserSrv;
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

                return new OperationResult
                {
                    Data = registerUser,
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

        public async Task<OperationResult> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new OperationResult()
                {
                    Data = userId,
                    Messages = new[] { $"There is no user with UserID = [{userId}]" }
                };
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
            {
                _gpUserSrv.AddGPUserForIdentity(userId, user.Email, user.UserName);
                return new OperationResult()
                {
                    Success = true,
                    Messages = new[] { $"User with Id = [{userId}] has been confirmed successfully" }
                };
            }

            return new OperationResult()
            {
                Messages = new[] { "Something went wrong while email confirmation. Try again later" }
            };
        }

        public async Task<OperationResult> ConfirmResetAsync(string userId, string token, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new OperationResult()
                {
                    Data = userId,
                    Messages = new[] { $"There is no user with UserID = [{userId}]" }
                };
            }

            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);

            if (result.Succeeded)
            {
                return new OperationResult()
                {
                    Success = true,
                    Messages = new[] { $"User`s password with Id = [{userId}] has been reset successfully" }
                };
            }

            return new OperationResult()
            {
                Messages = new[] { "Something went wrong while password reset. Try again later" }
            };

        }

        public async Task ConfirmAccountWithoutEmailAsync(string userEmail)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);

            user.EmailConfirmed = true;

            _gpUserSrv.AddGPUserForIdentity(user.Id, user.Email, user.UserName);
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
    }
}
