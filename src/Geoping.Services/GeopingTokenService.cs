using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GeoPing.Core.Models.Entities;

namespace Geoping.Services
{
    public class GeopingTokenService : IGeopingTokenService
    {
        private IRepository<GeoPingToken> _tokenRepo;

        public GeopingTokenService(IRepository<GeoPingToken> tokenRepo)
        {
            _tokenRepo = tokenRepo;
        }

        public string[] DecodeSharingToken(string token)
        {
            var result = token.Split(',');

            MarkIsUsed(token);

            return result;
        }

        public GeoPingToken GetSharingToken(string email, string listId)
        {
            var token = new GeoPingToken()
            {
                Created = DateTime.UtcNow,
                Type = "sharing",
                Token = $"{email},{listId}",
            };

            return _tokenRepo.Add(token);
        }

        private void MarkIsUsed(string token)
        {
            var gpToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token);

            gpToken.IsUsed = true;

            _tokenRepo.Update(gpToken);
        }
    }
}
