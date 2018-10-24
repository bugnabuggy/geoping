using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Identity;
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
        private readonly SignInManager<AppIdentityUser> _signInManager;
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IEmailService _emailSvc;

        public AccountService(UserManager<AppIdentityUser> userManager,
                              SignInManager<AppIdentityUser> signInManager,
                              ILogger logger,
                              ApplicationDbContext dbContext,
                              IEmailService emailSvc)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _dbContext = dbContext;
            _emailSvc = emailSvc;
        }

        public async Task<OperationResult> Register(RegisterUserDTO registerUser)
        {
            // Checking if there is another user with given Email and UserName
            if (_userManager.FindByEmailAsync(registerUser.Email).Result != null)
            {
                return new OperationResult()
                {
                    Data = registerUser,
                    Success = false,
                    Messages = new[] { "Email is invalid or was already taken" }
                };
            }

            if (_userManager.FindByNameAsync(registerUser.UserName).Result != null)
            {
                return new OperationResult()
                {
                    Data = registerUser,
                    Success = false,
                    Messages = new[] { "Username is invalid or was already taken" }
                };
            }

            // If all checks gone - registering 
            var user = new AppIdentityUser { UserName = registerUser.UserName, Email = registerUser.Email };

            var result = await _userManager.CreateAsync(user, registerUser.Password);

            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                _emailSvc.Send(new EmailMessage()
                {
                    FromAddress = new EmailAddress()
                    {
                        Name = "GeopingTeam",
                        Address = "noreply@geoping.info"
                    },
                    ToAddress = new EmailAddress()
                    {
                        Name = registerUser.UserName,
                        Address = registerUser.Email
                    },
                    Subject = "Email confirmation",
                    Content = _emailSvc.GetConfirmationMail(registerUser.UserName, "FILL THIS")
                });



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

        public bool UserExist(RegisterUserDTO user)
        {
            return false;
        }
    }
}
