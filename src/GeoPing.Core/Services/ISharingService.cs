using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface ISharingService
    {
        OperationResult AcceptSharing(Guid actingUserId, string sharingId);
        void ConfirmSharingWithRegistration(string sharingId, Guid userId, string email);
        IEnumerable<UserAutoCompleteDTO> GetAutoCompletedUsersList(string query);
        IEnumerable<SharedListInfoDTO> GetListsSharedWith(Guid userId);
        IEnumerable<SharedListInfoDTO> GetListsSharedWith(Guid userId, string sharingStatus);
        OperationResult<IEnumerable<UserListWasSharedWithDTO>> 
            GetUsersListWasSharedWith(Guid userId, string listId);
        Task<OperationResult> InviteUsersByList(Guid actingUserId, string listId, string[] usersData);
        OperationResult RefuseSharing(Guid actingUserId, string sharingId);
        OperationResult RevokeSharing(Guid ownerUserId, string sharingId);
    }
}
