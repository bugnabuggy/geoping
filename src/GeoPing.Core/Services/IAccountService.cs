using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface IAccountService
    {
        OperationResult Register(RegisterUserDTO user);
    }
}
