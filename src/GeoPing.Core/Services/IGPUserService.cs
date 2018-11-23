﻿using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace GeoPing.Core.Services
{
    public interface IGPUserService
    {
        GeoPingUser GetUser(Expression<Func<GeoPingUser, bool>> func);
        ShortUserInfoDTO GetUserNameAndAvatar(Expression<Func<GeoPingUser, bool>> func);
        GeoPingUser AddGPUserForIdentity(string identityUserId, string email, string username);
        OperationResult<GeoPingUser> EditUser(GeoPingUser user);
        void ActivateUser(string id);
        IEnumerable<UserNameWithEmailDTO> GetUsersNameAndEmail(string firstLetters);
    }
}
