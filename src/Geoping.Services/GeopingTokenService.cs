using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Geoping.Services
{
    public class GeopingTokenService : IGeopingTokenService
    {
        private IRepository<GeopingTokenService> _tokenRepo;

        public GeopingTokenService(IRepository<GeopingTokenService> tokenRepo)
        {
            _tokenRepo = tokenRepo;
        }

        public object DecodeToken(string token)
        {
            throw new NotImplementedException();
        }

        public object GetSharingToken(string email, string listId)
        {
            var token = new GeoPingToken()
            {
                Created = DateTime.UtcNow,
                Type = "sharing",
                Token = 
            };


            throw new NotImplementedException();
        }
    }
}
