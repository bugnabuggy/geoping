using GeoPing.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GeoPing.Api.Interfaces
{
    public interface IHelper
    {
        string GetUserIdByClaims(IEnumerable<Claim> claims);

        ApplicationUser GetUserByClaims(IEnumerable<Claim> claims);
    }
}
