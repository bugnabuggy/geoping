﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGPUserService
    {
        IQueryable<GeoPingUser> GetUsers(Expression<Func<GeoPingUser, bool>> func);
        GeoPingUser GetUser(Expression<Func<GeoPingUser, bool>> func);
        ShortUserInfoDTO GetUserNameAndAvatar(Expression<Func<GeoPingUser, bool>> func);
        GeoPingUser AddGPUserForIdentity(string identityUserId, string email, string username);
        OperationResult<GeoPingUser> EditUser(GeoPingUser user);
        void ActivateUser(string id);
        IEnumerable<UserAutoCompleteDTO> GetUsersShortInfoList(string firstLetters);
    }
}
