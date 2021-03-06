﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GeoPing.Services
{
    public class GeopingUserService : IGeopingUserService
    {
        private IRepository<GeoPingUser> _gpUserRepo;
        private ApplicationSettings _settings;
        private UserManager<AppIdentityUser> _userManager;
        private ILogger<GeopingUserService> _logger;

        public GeopingUserService
            (IRepository<GeoPingUser> gpUserRepo,
            IOptions<ApplicationSettings> settings,
            UserManager<AppIdentityUser> userManager,
            ILogger<GeopingUserService> logger)
        {
            _gpUserRepo = gpUserRepo;
            _settings = settings.Value;
            _userManager = userManager;
            _logger = logger;
        }

        public GeoPingUser GetUser(Expression<Func<GeoPingUser, bool>> func)
        {
            return _gpUserRepo.Data.FirstOrDefault(func);
        }

        public IQueryable<GeoPingUser> GetUsers(Expression<Func<GeoPingUser, bool>> func)
        {
            return _gpUserRepo.Get(func);
        }

        public IEnumerable<UserAutoCompleteDTO> GetUsersShortInfoList(string firstLetters)
        {
            if (firstLetters.Length < _settings.AutoComplete.MinCharsToAutoComplete)
            {
                return null;
            }

            firstLetters = firstLetters.ToUpper();

            var data = _gpUserRepo.Get(x => x.Login.ToUpper().StartsWith(firstLetters));

            if (data.Count() < _settings.AutoComplete.SizeOfAutoCompletedList)
            {
                var dataByEmail = _gpUserRepo
                    .Get(x => x.Email.ToUpper().StartsWith(firstLetters))
                    .Except(data);

                data = data.Concat(dataByEmail);
            }

            return data
                .Take(_settings.AutoComplete.SizeOfAutoCompletedList)
                .Select(x => new UserAutoCompleteDTO
                {
                    UserId = x.Id,
                    FullName = x.LastName != null || x.FirstName != null
                        ? $"{x.LastName} {x.FirstName}".Trim()
                        : "",
                    UserName = x.Login,
                    Email = x.Email
                });
        }

        public void UpgradeToPremiumForATime(Guid userId, int duration)
        {
            var user = _gpUserRepo.Data.FirstOrDefault(x => x.Id == userId);
            
            user.LastPaid = DateTime.UtcNow;

            if (!user.AccountUpgradeExpirationTime.HasValue ||
                user.AccountUpgradeExpirationTime.Value < user.LastPaid)
            {
                user.AccountUpgradeExpirationTime = user.LastPaid.Value.AddSeconds(duration);
            }
            else
            {
                user.AccountUpgradeExpirationTime = user.AccountUpgradeExpirationTime.Value.AddSeconds(duration);
            }

            user.AccountType = "premium";

            _gpUserRepo.Update(user);
        }

        public async Task<ShortUserInfoDTO> GetUserCommonInfo(string userId)
        {
            var gpUser = GetUser(x => x.IdentityId == userId);

            if (gpUser == null)
            {
                return new ShortUserInfoDTO();
            }

            var user = await _userManager.FindByIdAsync(gpUser.IdentityId);

            return new ShortUserInfoDTO
            {
                UserName = gpUser.Login,
                Avatar = gpUser.Avatar,
                UserId = gpUser.Id,
                Roles = await _userManager.GetRolesAsync(user)
            };
        }

        public GeoPingUser EditUser(GeoPingUser user)
        {
            _logger.LogInformation($"User with Id = [{user.Id} edited his profile.");

            return _gpUserRepo.Update(user);
        }

        public GeoPingUser AddGPUserForIdentity(string identityUserId, string email, string username, string timeZone)
        {
            _logger.LogInformation($"Added GeoPingUser for identity User with Id = [{identityUserId}]");

            return _gpUserRepo.Add(new GeoPingUser
            {
                IdentityId = identityUserId,
                Email = email,
                Login = username,
                TimeZone = timeZone,
                AccountType = "regular",
                Avatar = DefaultUserSettings.AvatarImage
            });
        }

        public void ActivateUser(string id)
        {
            var user = GetUser(x => x.IdentityId == id);
            user.IsActivated = true;
            _gpUserRepo.Update(user);
        }
    }
}
