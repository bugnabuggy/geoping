using System;
using System.Linq;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Options;

namespace GeoPing.Services
{
    public class GeopingTokenService : IGeopingTokenService
    {
        private IRepository<GeoPingToken> _tokenRepo;
        private IRepository<ListSharing> _sharingRepo;
        private IGeopingUserService _userSrv;
        private ISecurityService _secutitySrv;
        private ApplicationSettings _settings;

        public GeopingTokenService
            (IRepository<GeoPingToken> tokenRepo,
            IRepository<ListSharing> sharingRepo,
            ISecurityService securitySrv,
            IOptions<ApplicationSettings> settings,
            IGeopingUserService userSrv)
        {
            _tokenRepo = tokenRepo;
            _sharingRepo = sharingRepo;
            _userSrv = userSrv;
            _secutitySrv = securitySrv;
            _settings = settings.Value;
        }

        // Value = ListSharing`s ID
        public GeoPingToken CreateSharingInviteToken(string value)
        {
            var result = _tokenRepo.Add(new GeoPingToken
            {
                Type = "SharingInvite",
                Created = DateTime.UtcNow,
                Value = value,
                Token = _secutitySrv.GetSHA256HashString(value)
            });

            return result;
        }

        // Value = ListSharing`s ID
        public GeoPingToken CreateSharingToken(string value)
        {
            var result = _tokenRepo.Add(new GeoPingToken
            {
                Type = "Sharing",
                Created = DateTime.UtcNow,
                Value = value,
                Token = _secutitySrv.GetSHA256HashString(value)
            });

            return result;
        }

        public void DeleteSharingTokens(string sharingId)
        {
            var tokens = _tokenRepo.Data.Where(x => x.Value == sharingId).AsEnumerable();

            _tokenRepo.Delete(tokens);
        }

        public GeoPingToken CreateConfirmationEmailToken(string userId, string aspnetToken)
        {
            var value = $"{userId},{aspnetToken}";

            var result = _tokenRepo.Add(new GeoPingToken
            {
                Type = "ConfirmEmail",
                Created = DateTime.UtcNow,
                Value = value,
                Token = _secutitySrv.GetSHA256HashString(value)
            });

            return result;
        }

        public GeoPingToken CreateConfirmationResetToken(string userId, string aspnetToken)
        {
            var value = $"{userId},{aspnetToken}";

            var result = _tokenRepo.Add(new GeoPingToken
            {
                Type = "ConfirmReset",
                Created = DateTime.UtcNow,
                Value = value,
                Token = _secutitySrv.GetSHA256HashString(value)
            });

            return result;
        }

        public OperationResult<TokenInfoDTO> ExamineToken(string token)
        {
            var gpToken = _tokenRepo.Get().FirstOrDefault(x => x.Token == token);

            if (gpToken == null)
            {
                return new OperationResult<TokenInfoDTO>
                {
                    Messages = new[] { "Token not found" }
                };
            }

            var validationResult = ValidateGPToken(gpToken);

            if (validationResult != null)
            {
                return new OperationResult<TokenInfoDTO>
                {
                    Messages = new[] { $"{validationResult} token." }
                };
            }

            var sharing = _sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(gpToken.Value));

            if (sharing == null)
            {
                return new OperationResult<TokenInfoDTO>()
                {
                    Messages = new[] { "List sharing doesn`t exist." }
                };
            }

            var targetUserId = sharing.UserId;
            var userData = gpToken.Type == "SharingInvite"
                ? sharing.Email
                : _userSrv.GetUser(x => x.Email == sharing.Email).Login;

            MarkAsUsed(token);

            return new OperationResult<TokenInfoDTO>
            {
                Success = true,
                Messages = new[] { "Following token was found" },
                Data = new TokenInfoDTO
                {
                    TokenType = gpToken.Type,
                    UserId = targetUserId,
                    UserData = userData
                }
            };
        }

        public GeoPingToken GetToken(string token)
        {
            var result = _tokenRepo.Get().FirstOrDefault(x => x.Token == token);

            if (ValidateGPToken(result) == null)
            {
                return result;
            }

            return null;
        }

        public OperationResult MarkAsUsed(string token)
        {
            var gpToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token);

            if (gpToken != null)
            {
                gpToken.IsUsed = true;

                _tokenRepo.Update(gpToken);

                return new OperationResult
                {
                    Success = true,
                    Messages = new[] { "Token is used now" }
                };
            }

            return new OperationResult
            {
                Messages = new[] { "Token is invalid" }
            };
        }

        public string ValidateGPToken(GeoPingToken gpToken)
        {
            if (gpToken != null)
            {
                if (gpToken.IsUsed)
                {
                    return "Used";
                }

                if ((DateTime.UtcNow - gpToken.Created).Seconds >
                    _settings.GeopingToken.TokenLifetime.GetValue(gpToken.Type))
                {
                    return "Expired";
                }
            }

            return null;
        }

        public bool TryGetToken(string token, out GeoPingToken geoPingToken)
        {
            geoPingToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token); ;

            return geoPingToken != null;
        }
    }
}
