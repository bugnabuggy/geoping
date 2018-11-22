using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Geoping.Services
{
    public class GeopingTokenService : IGeopingTokenService
    {
        private IRepository<GeoPingToken> _tokenRepo;
        private IRepository<ListSharing> _sharingRepo;
        private ISecurityService _secSrv;
        private IConfiguration _cfg;

        public GeopingTokenService
            (IRepository<GeoPingToken> tokenRepo,
            IRepository<ListSharing> sharingRepo,
            ISecurityService secSrv,
            IConfiguration cfg)
        {
            _tokenRepo = tokenRepo;
            _sharingRepo = sharingRepo;
            _secSrv = secSrv;
            _cfg = cfg;
        }

        // Value = ListSharing`s ID
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

        // Value = ListSharing`s ID
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

        public OperationResult<TokenInfoDTO> ExamineToken(string token)
        {
            var gpToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token);

            if (gpToken != null)
            {
                if (gpToken.IsUsed)
                {
                    return new OperationResult<TokenInfoDTO>()
                    {
                        Messages = new[] { "Used" }
                    };
                }

                if ((DateTime.UtcNow - gpToken.Created).Seconds >
                    _cfg.GetValue<int>($"GeoPingTokenSettings:{gpToken.Type}TokenLifetime"))
                {
                    return new OperationResult<TokenInfoDTO>()
                    {
                        Messages = new[] { "Expired" }
                    };
                }

                Guid? targetUserId = null;

                switch (gpToken.Type)
                {
                    case "Sharing":
                        targetUserId = _sharingRepo.Data
                            .FirstOrDefault(x => x.Id == Guid.Parse(gpToken.Value))
                            .UserId;
                        break;

                    case "SharingInvite":
                        targetUserId = _sharingRepo.Data
                            .FirstOrDefault(x => x.Id == Guid.Parse(gpToken.Value))
                            .UserId;
                        break;

                    default:
                        break;
                }

                return new OperationResult<TokenInfoDTO>()
                {
                    Success = true,
                    Messages = new[] { "Following token was found" },
                    Data = new TokenInfoDTO()
                    {
                        TokenType = gpToken.Type,
                        UserId = targetUserId
                    }
                };
            }

            return new OperationResult<TokenInfoDTO>()
            {
                Messages = new[] { "Token not found" }
            };
        }

        public OperationResult MarkAsUsed(string token)
        {
            var gpToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token);

            if (gpToken != null)
            {
                gpToken.IsUsed = true;

                _tokenRepo.Update(gpToken);

                return new OperationResult()
                {
                    Success = true,
                    Messages = new[] { "Token is used now" }
                };
            }

            return new OperationResult()
            {
                Messages = new[] { "Token is invalid" }
            };
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
