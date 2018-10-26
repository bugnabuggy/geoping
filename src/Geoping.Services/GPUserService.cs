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
                Avatar = Convert.ToBase64String(data.Avatar)
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
            });
        }
    }
}
