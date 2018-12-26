using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IGeopingUserService
    {
        IQueryable<GeoPingUser> GetUsers(Expression<Func<GeoPingUser, bool>> func);
        GeoPingUser GetUser(Expression<Func<GeoPingUser, bool>> func);
        Task<ShortUserInfoDTO> GetUserCommonInfo(string userId);
        GeoPingUser AddGPUserForIdentity(string identityUserId, string email, string username, string timeZone);
        GeoPingUser EditUser(GeoPingUser user);
        void ActivateUser(string id);
        IEnumerable<UserAutoCompleteDTO> GetUsersShortInfoList(string firstLetters);
        void UpgradeToPremiumForATime(Guid userId, int duration);
    }
}
