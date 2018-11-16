using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface IGeopingTokenService
    {
        GeoPingToken GetSharingToken(string value);
        GeoPingToken GetSharingInviteToken(string value);
        string DecodeSharingToken(string token);
    }
}
