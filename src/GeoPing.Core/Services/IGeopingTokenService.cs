using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface IGeopingTokenService
    {
        GeoPingToken GetSharingToken(string value);
        GeoPingToken GetSharingInviteToken(string value);
        OperationResult<TokenInfoDTO> ExamineToken(string token);
        OperationResult MarkAsUsed(string token);
    }
}
