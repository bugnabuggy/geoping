﻿using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GeoPing.Core.Services
{
    public interface ISharingService
    {
        IEnumerable<SharedListInfoDTO> GetSharedLists(Expression<Func<ListSharing, bool>> query);

        OperationResult<IEnumerable<object>> GetAllowedUsers(Guid userId, string listId);
        Task<OperationResult> InviteUsersByList(Guid userId, string listId, string[] usersData);
        OperationResult DeleteSharing(Guid userId, string sharingId);
        OperationResult AcceptSharingInvite(Guid userId, string sharingId);
        OperationResult DeclineSharingInvite(Guid userId, string sharingId);
        void ConfirmSharingWithRegistration(string sharingId, Guid userId, string email);
        IEnumerable<UserAutoCompleteDTO> GetAutoCompletedUsersList(string query);
    }
}
