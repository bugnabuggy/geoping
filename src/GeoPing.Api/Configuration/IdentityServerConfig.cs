using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Geoping.Services;
using GeoPing.Core;

namespace GeoPing.Api.Configuration
{
    public class IdentityServerConfig
    {
        // Defining the API
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(Constants.ApiName, "GeopingAPI")
            };
        }

        // Defining the client
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {

                    ClientId = Constants.ClientId,
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AccessTokenType = AccessTokenType.Jwt,
                    AccessTokenLifetime = IdentityServerSettings.AccessTokenLifetime,

                    RequireConsent = false,

                    ClientSecrets =
                    {
                        new Secret(Constants.ClientSecret.Sha256())
                    },

                    AllowedScopes =
                    {
                        Constants.ApiName
                    },

                    AllowOfflineAccess = true
                }
            };
        }
    }
}
