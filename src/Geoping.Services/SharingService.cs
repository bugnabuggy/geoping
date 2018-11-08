using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.Utilities.EmailSender;
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

        public SharingService(IRepository<ListSharing> shareRepo,
                              ISecurityService securitySrv,
                              IGeolistService listSrv,
                              IGeopingTokenService tokenSrv)
        {
            _shareRepo = shareRepo;
            _securitySrv = securitySrv;
            _listSrv = listSrv;
            _tokenSrv = tokenSrv;
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
                    Messages = new[] { $"User with this email = [{email}] had been invited." }
                };
            }

            return new OperationResult()
            {
                Data = _tokenSrv.GetSharingToken(email),
                Success = true,
                Messages = new[] { $"Invite for user with email = [{email}] has been sent." }
            };
        }

        public Task<OperationResult> ConfirmInvitationAsync(string token)
        {
            var email = _tokenSrv.DecodeToken(token);

            var invitedUser = await _userManager.FindByEmailAsync(email);

            if (invitedUser == null)
            {

            }

            _shareSrv.ConfirmInvitation()

            return Ok();
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
