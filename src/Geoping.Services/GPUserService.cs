﻿using System;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System.Collections.Generic;
using Microsoft.Extensions.Options;

namespace Geoping.Services
{
    public class GPUserService : IGPUserService
    {
        private IRepository<GeoPingUser> _gpUserRepo;
        private ApplicationSettings _settings;

        public GPUserService
            (IRepository<GeoPingUser> gpUserRepo,
            IOptions<ApplicationSettings> settings)
        {
            _gpUserRepo = gpUserRepo;
            _settings = settings.Value;
        }

        public GeoPingUser GetUser(Expression<Func<GeoPingUser, bool>> func)
        {
            return _gpUserRepo.Get().FirstOrDefault(func);
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
                data = data.Concat(_gpUserRepo.Get(x => x.Email.ToUpper().StartsWith(firstLetters)));
            }

            return data
                .Take(_settings.AutoComplete.SizeOfAutoCompletedList)
                .Select(x => new UserAutoCompleteDTO()
                {
                    FullName = $"{x.LastName} {x.FirstName}",
                    UserName = x.Login,
                    Email = x.Email
                });
        }

        public ShortUserInfoDTO GetUserNameAndAvatar(Expression<Func<GeoPingUser, bool>> func)
        {
            var data = GetUser(func);

            return new ShortUserInfoDTO()
            {
                UserName = data.Login,
                Avatar = data.Avatar
            }; 
        }

        public OperationResult<GeoPingUser> EditUser(GeoPingUser user)
        {
            return new OperationResult<GeoPingUser>()
            {
                Data = _gpUserRepo.Update(user),
                Messages = new[] { "Profile was successfully edited." },
                Success = true
            };
        }

        public GeoPingUser AddGPUserForIdentity(string identityUserId, string email, string username)
        {
            return _gpUserRepo.Add(new GeoPingUser
            {
                IdentityId = identityUserId,
                Email = email,
                Login = username,
                AccountType = "regular",
                Avatar =   DefaultUserSettings.AvatarImage
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
