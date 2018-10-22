using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Geoping.Services
{
    class AccountService : IAccountService
    {





        public OperationResult Register(RegisterUserDTO user)
        {
            throw new NotImplementedException();
        }

        public bool UserExist(RegisterUserDTO user)
        {
            return false;
        }
    }
}
