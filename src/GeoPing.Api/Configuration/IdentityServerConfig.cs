using IdentityServer4.Models;
using System.Collections.Generic;
using GeoPing.Core;

namespace GeoPing.Api.Configuration
{
    public class IdentityServerConfig
    {
        private ApplicationSettings settings;

        // Defining the API
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api", "GeopingAPI")
            };
        }

        // Defining the client
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {

                    ClientId = "3BA47D64D7DA5EF4",
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AccessTokenType = AccessTokenType.Jwt,
                    AccessTokenLifetime = 2592000,

                    RequireConsent = false,

                    ClientSecrets =
                    {
                        new Secret("8E3BCE2633F91D7B".Sha256())
                    },

                    AllowedScopes =
                    {
                        "api"
                    },

                    AllowOfflineAccess = true
                }
            };
        }
    }
}
