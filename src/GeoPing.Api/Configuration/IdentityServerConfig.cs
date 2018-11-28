using System.Collections.Generic;
using IdentityServer4.Models;

namespace GeoPing.Api.Configuration
{
    public class IdentityServerConfig
    {
        // Defining the API
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(IdentityServerSettings.ApiName, "GeopingAPI")
            };
        }

        // Defining the client
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {

                    ClientId = IdentityServerSettings.ClientId,
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AccessTokenType = AccessTokenType.Jwt,
                    AccessTokenLifetime = IdentityServerSettings.AccessTokenLifetime,

                    RequireConsent = false,

                    ClientSecrets =
                    {
                        new Secret(IdentityServerSettings.ClientSecret.Sha256())
                    },

                    AllowedScopes =
                    {
                        IdentityServerSettings.ApiName
                    },

                    AllowOfflineAccess = true
                }
            };
        }
    }
}
