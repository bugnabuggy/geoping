using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GeoPing.Api.Services
{
    public class Helper : IHelper
    {
        private UserManager<ApplicationUser> _userManager;

        public Helper(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public string GetUserIdByClaims(IEnumerable<Claim> claims)
        {
            return claims.FirstOrDefault(c => c.Type.Equals("sub")).Value;
        }

        public ApplicationUser GetUserByClaims(IEnumerable<Claim> claims)
        {
            return _userManager.FindByIdAsync(GetUserIdByClaims(claims)).Result;
        }
    }
}
