using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.Core.Services
{
    public interface ISharingService
    {
        OperationResult InviteByEmail(Guid userId, string listId, string email);
        Task<OperationResult> ConfirmInvitationAsync(string invitedUserId, string token);
        OperationResult<IEnumerable<object>> GetAllowedUsers(Guid userId, string listId);
    }
}
