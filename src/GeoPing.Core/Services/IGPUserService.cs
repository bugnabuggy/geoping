using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface IGPUserService
    {
        void AddGPUserForIdentity(string identityUserId, string email, string username);
    }
}
