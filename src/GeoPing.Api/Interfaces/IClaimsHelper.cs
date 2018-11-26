using GeoPing.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Api.Interfaces
{
    public interface IClaimsHelper
    {
        string GetIdentityUserIdByClaims(IEnumerable<Claim> claims);

        AppIdentityUser GetIdentityUserByClaims(IEnumerable<Claim> claims);

        Guid GetAppUserIdByClaims(IEnumerable<Claim> claims);

        GeoPingUser GetAppUserByClaims(IEnumerable<Claim> claims);
    }
}
