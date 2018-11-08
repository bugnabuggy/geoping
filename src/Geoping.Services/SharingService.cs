using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Geoping.Services
{
    public class SharingService : ISharingService
    {
        private IRepository<ListSharing> _shareRepo;
        private ISecurityService _securitySrv;
        private IGeolistService _listSrv;
        private IGeopingTokenService _tokenSrv;
        private IGPUserService _gpUserSrv;
        private UserManager<AppIdentityUser> _userManager;

        public SharingService(IRepository<ListSharing> shareRepo,
                              ISecurityService securitySrv,
                              IGeolistService listSrv,
                              IGeopingTokenService tokenSrv,
                              IGPUserService gpUserSrv,
                              UserManager<AppIdentityUser> userManager)
        {
            _shareRepo = shareRepo;
            _securitySrv = securitySrv;
            _listSrv = listSrv;
            _tokenSrv = tokenSrv;
            _gpUserSrv = gpUserSrv;
            _userManager = userManager;
        }

        public OperationResult InviteByEmail(Guid userId, string listId, string email)
        {
            // TODO: REFACTOR THIS. IT MAY BE UNITED SOMEHOW
            // ↓↓↓↓↓↓↓
            if (!_listSrv.IsListExistWithThisId(listId, out var list))
            {
                return new OperationResult()
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToWatchList(userId, list))
            {
                return new OperationResult()
                {
                    Messages = new[] { "You are not allowed to do this" }
                };
            }
            // ↑↑↑↑↑↑↑

            if (IsUserHasBeenInvited(userId, list.Id))
            {
                return new OperationResult()
                {
                    Messages = new[] { $"User with this email = [{email}] was invited some time ago." }
                };
            }

            return new OperationResult()
            {
                //Data = _tokenSrv.GetSharingToken(email),
                Success = true,
                Messages = new[] { $"Invite for user with email = [{email}] has been sent." }
            };
        }

        public async Task<OperationResult> ConfirmInvitationAsync(string invitedUserId, string token)
        {
            var data = /*_tokenSrv.DecodeToken(token)*/new[] { "" };

            var email = (string)data[0];
            var listId = (string)data[1];

            if (!_listSrv.IsListExistWithThisId(listId, out var list))
            {
                return new OperationResult()
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            var invitedUser = await _userManager.FindByEmailAsync(email);

            if (invitedUser == null)
            {
                return new OperationResult()
                {
                    Data = "302-1",
                    Messages = new[] { "You should register in our service to continue using it" }
                };
            }

            if (invitedUserId == null)
            {
                return new OperationResult()
                {
                    Data = "302-2",
                    Messages = new[] { "You should sign in our service to continue using it" }
                };
            }

            if (invitedUserId != invitedUser.Id)
            {
                return new OperationResult()
                {
                    Messages = new[] { "You have no rights to do this" }
                };
            }

            return new OperationResult()
            {
                Data = _shareRepo.Add(new ListSharing()
                {
                    InvitationDate = DateTime.UtcNow,
                    ListId = list.Id,
                    UserId = _gpUserSrv.GetUser(x => x.IdentityId == invitedUser.Id).Id,
                    Status = "invited"
                }),
                Messages = new[] { "You confirmed invite to list. " +
                "Now accept invitation to be able to watch list and check in its points" },
                Success = true
            };
        }

        public OperationResult<IEnumerable<object>> GetAllowedUsers(Guid userId, string listId)
        {
            var isListExist = _listSrv.IsListExistWithThisId(listId, out var list);
            if (!isListExist)
            {
                return new OperationResult<IEnumerable<object>>()
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            var isUserAllowed = _securitySrv.IsUserHasAccessToWatchList(userId, list);
            if (!isUserAllowed)
            {
                return new OperationResult<IEnumerable<object>>()
                {
                    Messages = new[] { "You are not allowed to do this" }
                };
            }

            return new OperationResult<IEnumerable<object>>()
            {
                Success = true,
                Messages = new[] { $"Following users have access to list with ID = [{listId}]" },
                Data = _securitySrv.GetUsersHaveAccessToList(list)
            };
        }

        private bool IsUserHasBeenInvited(Guid userId, Guid listId)
        {
            var invite = _shareRepo.Data.FirstOrDefault(x => x.UserId == userId &&
                                                             x.ListId == listId);
            if (invite == null)
            {
                return false;
            }

            return true;
        }
    }
}
