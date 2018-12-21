using System.Threading.Tasks;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGeopingTokenService
    {
        GeoPingToken CreateSharingToken(string value);
        GeoPingToken CreateSharingInviteToken(string value);
        OperationResult<TokenInfoDTO> ExamineSharingToken(string token);
        OperationResult MarkAsUsed(string token);
        void DeleteSharingTokens(string sharingId);
        GeoPingToken CreateConfirmationEmailToken(string userId, string aspnetToken);
        GeoPingToken CreateConfirmationResetToken(string userId, string aspnetToken);
        string ValidateGPToken(GeoPingToken gpToken);
        bool TryGetToken(string token, out GeoPingToken geoPingToken);
    }
}
