using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
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
            // TODO: solve nullreference exception
            return claims.Any()
                   ? claims.FirstOrDefault(c => c.Type.Equals("sub")).Value
                   : null;
        }

        public AppIdentityUser GetIdentityUserByClaims(IEnumerable<Claim> claims)
        {
            return claims.Any()
                   ? _userManager.FindByIdAsync(GetIdentityUserIdByClaims(claims)).Result
                   : null;
        }

        public Guid GetAppUserIdByClaims(IEnumerable<Claim> claims)
        {
            return claims.Any()
                   ? GetAppUserByClaims(claims).Id
                   : Guid.Empty;
        }

        public GeoPingUser GetAppUserByClaims(IEnumerable<Claim> claims)
        {
            return claims.Any()
                   ? _gpUserRepo.Data.FirstOrDefault(x => x.IdentityId == GetIdentityUserIdByClaims(claims))
                   : null;
        }
    }
}
