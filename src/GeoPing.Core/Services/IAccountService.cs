using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.Core.Services
{
    public interface IAccountService
    {
        Task<OperationResult> Register(RegisterUserDTO registerUser);
    }
}
