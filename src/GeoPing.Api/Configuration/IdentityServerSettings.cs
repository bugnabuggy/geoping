using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class IdentityServerSettings
    {
        public static int AccessTokenLifetime { get; set; }
        public static string ApiName { get; set; }
        public static string ClientId { get; set; }
        public static string ClientSecret { get; set; }
        public static string ServerUrl { get; set; }
    }
}
