using Geoping.Services.Configuration;
using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using GeoPing.Infrastructure.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace GeoPing.Services
{
    public class GPUserService : IGPUserService
    {
        private IRepository<GeoPingUser> _gpUserRepo;
        private IRepository<AppIdentityUser> _identityUserRepo;
        private IConfiguration _cfg;

        public GPUserService(IRepository<GeoPingUser> gpUserRepo,
                             IRepository<AppIdentityUser> identityUserRepo,
                             IConfiguration cfg)
        {
            _gpUserRepo = gpUserRepo;
            _identityUserRepo = identityUserRepo;
            _cfg = cfg;
        }

        public GeoPingUser GetUser(Expression<Func<GeoPingUser, bool>> func)
        {
            return _gpUserRepo.Data.FirstOrDefault(func);
        }

        public IEnumerable<UserNameWithEmailDTO> GetUsersNameAndEmail(string firstLetters)
        {
            if (firstLetters.Length < _cfg.GetValue<int>("UsersShortlist:MinCharsToReturnUsersShortlist"))
            {
                return null;
            }
        
            firstLetters = firstLetters.ToUpper();

            var data = _identityUserRepo.Data
                .Where(x => x.NormalizedUserName.StartsWith(firstLetters));

            if (data.Count() < 10)
            {
                data.Concat(_identityUserRepo.Data
                    .Where(x => x.NormalizedEmail.StartsWith(firstLetters)));
            }

            return data.Take(_cfg.GetValue<int>("UsersShortlist:ListSize"))
                .Select(x => new UserNameWithEmailDTO()
                {
                    Username = x.UserName,
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
