using System;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;

namespace Geoping.Services
{
    public class GPUserService : IGPUserService
    {
        private IRepository<GeoPingUser> _gpUserRepo;

        public GPUserService(IRepository<GeoPingUser> gpUserRepo)
        {
            _gpUserRepo = gpUserRepo;
        }

        public GeoPingUser GetUser(Expression<Func<GeoPingUser, bool>> func)
        {
            return _gpUserRepo.Data.FirstOrDefault(func);
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

        public void AddGPUserForIdentity(string identityUserId, string email, string username)
        {
            _gpUserRepo.Add(new GeoPingUser
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
