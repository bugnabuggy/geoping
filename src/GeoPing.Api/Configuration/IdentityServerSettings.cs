using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class IdentityServerSettings
    {
        public static int AccessTokenLifetime { get; set; }
        public static int IdentityTokenLifetime { get; set; }
    }
}
