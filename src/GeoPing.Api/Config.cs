using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api
{
    public class Config
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
                    AccessTokenLifetime = 3600,

                    RequireConsent = false,

                    RedirectUris = {Constants.ServerUrl + "/signin-oidc" },
                    PostLogoutRedirectUris = {Constants.ServerUrl + "signout-callback-oidc"},

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
