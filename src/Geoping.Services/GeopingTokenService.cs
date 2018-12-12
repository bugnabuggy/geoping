using System;
using System.Linq;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Logging;
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
        private ILogger<GeopingTokenService> _logger;

        public GeopingTokenService
            (IRepository<GeoPingToken> tokenRepo,
            IRepository<ListSharing> sharingRepo,
            ISecurityService securitySrv,
            IOptions<ApplicationSettings> settings,
            IGeopingUserService userSrv,
            ILogger<GeopingTokenService> logger)
        {
            _tokenRepo = tokenRepo;
            _sharingRepo = sharingRepo;
            _userSrv = userSrv;
            _secutitySrv = securitySrv;
            _settings = settings.Value;
            _logger = logger;
        }

        // Value = ListSharing`s ID
        public GeoPingToken CreateSharingInviteToken(string sharingId)
        {
            _logger.LogDebug($"Creating new sharing-invite token for sharing with Id = [{sharingId}].");

            var result = _tokenRepo.Add(new GeoPingToken
            {
                Type = "SharingInvite",
                Created = DateTime.UtcNow,
                Value = sharingId,
                Token = _secutitySrv.GetSHA256HashString($"{sharingId}{Guid.NewGuid()}")
            });

            return result;
        }

        // Value = ListSharing`s ID
        public GeoPingToken CreateSharingToken(string sharingId)
        {
            _logger.LogDebug($"Creating new sharing token for sharing with Id = [{sharingId}].");

            var result = _tokenRepo.Add(new GeoPingToken
            {
                Type = "Sharing",
                Created = DateTime.UtcNow,
                Value = sharingId,
                Token = _secutitySrv.GetSHA256HashString($"{sharingId}{Guid.NewGuid()}")
            });

            return result;
        }

        public void DeleteSharingTokens(string sharingId)
        {
            _logger.LogDebug($"Deleting sharing tokens for sharing with Id = [{sharingId}].");

            var tokens = _tokenRepo.Data.Where(x => x.Value == sharingId).AsEnumerable();

            _tokenRepo.Delete(tokens);
        }

        public GeoPingToken CreateConfirmationEmailToken(string userId, string aspnetToken)
        {
            _logger.LogDebug($"Creating new email confirmation token for user with Id = [{userId}].");

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
            _logger.LogDebug($"Creating new password reset confirmation token for user with Id = [{userId}].");

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

        public OperationResult<TokenInfoDTO> ExamineSharingToken(string token)
        {
            if (TryGetToken(token, out var gpToken))
            {
                return new OperationResult<TokenInfoDTO>
                {
                    Messages = new[] { "Token not found" }
                };
            }

            _logger.LogDebug($"Examination token: Token = [{gpToken.Token}], Type = [{gpToken.Type}].");

            var validationResult = ValidateGPToken(gpToken);

            if (validationResult != null)
            {
                _logger.LogDebug($"Examined token = [{gpToken.Token}] is {validationResult}.");

                return new OperationResult<TokenInfoDTO>
                {
                    Messages = new[] { $"{validationResult} token." }
                };
            }

            var sharing = _sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(gpToken.Value));

            if (sharing == null)
            {
                _logger.LogWarning($"An error occured while examination sharing token: sharing doesn`t exist.");

                return new OperationResult<TokenInfoDTO>()
                {
                    Messages = new[] { "List sharing doesn`t exist." }
                };
            }

            var targetUserId = sharing.UserId;
            var userData = gpToken.Type == "SharingInvite"
                ? sharing.Email
                : _userSrv.GetUser(x => x.Email == sharing.Email).Login;

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

        public OperationResult MarkAsUsed(string token)
        {
            var gpToken = _tokenRepo.Data.FirstOrDefault(x => x.Token == token);

            if (gpToken == null)
            {
                return new OperationResult
                {
                    Messages = new[] { "Token is invalid" }
                };

            }

            gpToken.IsUsed = true;

            _tokenRepo.Update(gpToken);

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "Token is used now" }
            };
        }

        public string ValidateGPToken(GeoPingToken gpToken)
        {
            if (gpToken == null)
            {
                return null;
            }

            if (gpToken.IsUsed)
            {
                return "Used";
            }

            if ((DateTime.UtcNow - gpToken.Created).Seconds >
                _settings.GeopingToken.TokenLifetime.GetValue(gpToken.Type))
            {
                return "Expired";
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
 