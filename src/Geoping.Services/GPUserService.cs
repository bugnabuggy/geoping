using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
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
