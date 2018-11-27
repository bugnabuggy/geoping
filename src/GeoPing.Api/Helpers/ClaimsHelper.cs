using GeoPing.Api.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using GeoPing.Core.Models.Entities;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;

namespace GeoPing.Api.Helpers
{
    public class ClaimsHelper : IClaimsHelper
    {
        private UserManager<AppIdentityUser> _userManager;
        private IRepository<GeoPingUser> _gpUserRepo;

        public ClaimsHelper(UserManager<AppIdentityUser> userManager,
                            IRepository<GeoPingUser> gpUserRepo)
        {
            _userManager = userManager;
            _gpUserRepo = gpUserRepo;
        }

        public string GetIdentityUserIdByClaims(IEnumerable<Claim> claims)
        {
            return claims.Any(c => c.Type.Equals("sub"))
                   ? claims.FirstOrDefault(c => c.Type.Equals("sub")).Value
                   : null;
        }

        public AppIdentityUser GetIdentityUserByClaims(IEnumerable<Claim> claims)
        {
            return claims.Any(c => c.Type.Equals("sub"))
                   ? _userManager.FindByIdAsync(GetIdentityUserIdByClaims(claims)).Result
                   : null;
        }

        public Guid GetAppUserIdByClaims(IEnumerable<Claim> claims)
        {
            return claims.Any(c => c.Type.Equals("sub"))
                   ? GetAppUserByClaims(claims).Id
                   : Guid.Empty;
        }

        public GeoPingUser GetAppUserByClaims(IEnumerable<Claim> claims)
        {
            return claims.Any(c => c.Type.Equals("sub"))
                   ? _gpUserRepo.Data.FirstOrDefault(x => x.IdentityId == GetIdentityUserIdByClaims(claims))
                   : null;
        }
    }
}
