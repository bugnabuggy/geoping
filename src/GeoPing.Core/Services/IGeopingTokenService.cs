using GeoPing.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface IGeopingTokenService
    {
        OperationResult GetSharingToken(string email, string listId);
        OperationResult DecodeToken(string token);
    }
}
