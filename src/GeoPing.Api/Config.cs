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
        //// Defining the identity
        //public static IEnumerable<IdentityResource> GetIdentityResources()
        //{
        //    return new List<IdentityResource>
        //    {
        //        new IdentityResources.OpenId(),
        //        new IdentityResources.Profile(),
        //    };
        //}

        // Defining the API
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api", "MyAPI")
            };
        }

        // Defining the client
        public static IEnumerable<Client> GetClients()
        {
            string apiName = "api";
            string clientID = "mvc";
            string clientName = "MVC Client";
            string secret = "secret";

            return new List<Client>
            {
                new Client
                {

                    ClientId = clientID,
                    ClientName = clientName,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AccessTokenType = AccessTokenType.Jwt,
                    AccessTokenLifetime = 3600*24,  

                    RequireConsent = false,

                    ClientSecrets =
                    {
                        new Secret(secret.Sha256())
                    },

                    AllowedScopes =
                    {
                       apiName
                    },

                    AllowOfflineAccess = true
                }
            };
        }
    }
}
