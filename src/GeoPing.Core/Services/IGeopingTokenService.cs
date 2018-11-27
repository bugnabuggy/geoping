﻿using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGeopingTokenService
    {
        GeoPingToken GetToken(string token);
        GeoPingToken CreateSharingToken(string value);
        GeoPingToken CreateSharingInviteToken(string value);
        OperationResult<TokenInfoDTO> ExamineToken(string token);
        OperationResult MarkAsUsed(string token);
        void DeleteSharingTokens(string sharingId);
    }
}
