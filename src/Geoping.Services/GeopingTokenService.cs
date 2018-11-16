using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Geoping.Services
{
    public class GeopingTokenService : IGeopingTokenService
    {
        private IRepository<GeoPingToken> _tokenRepo;
        private ISecurityService _secSrv;

        public GeopingTokenService(IRepository<GeoPingToken> tokenRepo,
                                   ISecurityService secSrv)
        {
            _tokenRepo = tokenRepo;
            _secSrv = secSrv;
        }

        public GeoPingToken GetSharingInviteToken(string value)
        {
            var result = _tokenRepo.Add(new GeoPingToken()
            {
                Type = "SharingInvite",
                Created = DateTime.UtcNow,
                Value = value,
                Token = _secSrv.GetSHA256HashString(value)
            });

            return result;
        }

        public GeoPingToken GetSharingToken(string value)
        {
            var result = _tokenRepo.Add(new GeoPingToken()
            {
                Type = "Sharing",
                Created = DateTime.UtcNow,
                Value = value,
                Token = _secSrv.GetSHA256HashString(value)
            });

            return result;
        }
        
        public string DecodeSharingToken(string token)
        {
            var gpToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token);

            if (gpToken != null)
            {
                return gpToken.Value;
            }

            return null;
        }










        //public string[] DecodeSharingToken(string token)
        //{
        //    var result = token.Split(',');

        //    MarkIsUsed(token);

        //    return result;
        //}

        //public GeoPingToken GetSharingToken(string email, string listId)
        //{
        //    var token = new GeoPingToken()
        //    {
        //        Created = DateTime.UtcNow,
        //        Type = "sharing",
        //        Token = $"{email},{listId}",
        //    };

        //    return _tokenRepo.Add(token);
        //}

        private void MarkIsUsed(string token)
        {
            var gpToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token);

            gpToken.IsUsed = true;

            _tokenRepo.Update(gpToken);
        }
    }
}
