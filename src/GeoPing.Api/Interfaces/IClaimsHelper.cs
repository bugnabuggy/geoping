using System;
using System.Collections.Generic;
using System.Security.Claims;
using GeoPing.Core.Models.Entities;
using GeoPing.Infrastructure.Models;

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
