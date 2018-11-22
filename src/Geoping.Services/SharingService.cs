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
using Microsoft.Extensions.Configuration;
using GeoPing.Core.Models.DTO;
using System.Linq.Expressions;

namespace Geoping.Services
{
    public class SharingService : ISharingService
    {
        private IRepository<ListSharing> _shareRepo;
        private IRepository<GeoList> _listRepo;
        private ISecurityService _securitySrv;
        private IGeolistService _listSrv;
        private IGeopingTokenService _tokenSrv;
        private IGPUserService _gpUserSrv;
        private UserManager<AppIdentityUser> _userManager;
        private IValidationService _validator;
        private IEmailService _emailSvc;
        private IConfiguration _cfg;

        public SharingService
            (IRepository<ListSharing> shareRepo,
            IRepository<GeoList> listRepo,
            ISecurityService securitySrv,
            IGeolistService listSrv,
            IGeopingTokenService tokenSrv,
            IGPUserService gpUserSrv,
            UserManager<AppIdentityUser> userManager,
            IValidationService validator,
            IEmailService emailSvc,
            IConfiguration cfg)
        {
            _shareRepo = shareRepo;
            _securitySrv = securitySrv;
            _listRepo = listRepo;
            _listSrv = listSrv;
            _tokenSrv = tokenSrv;
            _gpUserSrv = gpUserSrv;
            _userManager = userManager;
            _validator = validator;
            _emailSvc = emailSvc;
            _cfg = cfg;
        }

        public IEnumerable<SharedListInfoDTO> GetSharedLists(Expression<Func<ListSharing, bool>> query)
        {
            var sharings = _shareRepo.Data.Where(query);

            var result =
                from s in sharings
                join l in _listRepo.Data on s.ListId equals l.Id
                select new SharedListInfoDTO()
                {
                    ListId = l.Id,
                    ListName = l.Name,
                    ListDescription = l.Description,
                    ListOwnerId = l.OwnerId,
                    ListCreated = l.Created,
                    ListEdited = l.Edited,
                    ListIsPublic = l.IsPublic,
                    ShareStatus = s.Status,
                    ShareInvitationDate = s.InvitationDate
                };

            return result.AsEnumerable();
        }

        public OperationResult DeleteSharing(string sharingId)
        {
            var isSharingId = Guid.TryParse(sharingId, out var id);

            if (isSharingId)
            {
                var item = _shareRepo.Data.FirstOrDefault(x => x.Id == id);

                _shareRepo.Delete(item);

                return new OperationResult()
                {
                    Success = true,
                    Messages = new []{"You successfully leave the shared list"}
                };
            }

            return new OperationResult()
            {
                Messages = new[] { "Shared list wasn`t found or id is invalid" }
            };
        }

        // Send sharing invitations to users in list
        public async Task<OperationResult> InviteUsersByList(Guid userId, string listId, string[] usersData)
        {
            // Checks if list is exists
            if (!_listSrv.IsListExistWithThisId(listId, out var list))
            {
                return new OperationResult()
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            // Checks if user have rights to call this method
            if (!_securitySrv.IsUserHasAccessToManipulateList(userId, list))
            {
                return new OperationResult()
                {
                    Messages = new[] { "You are not allowed to do this" }
                };
            }

            var messages = new List<string>();
            var invitedUsers = new List<string>();

            foreach (var userData in usersData)
            {
                // Try to find user by username one by one
                var user = await _userManager.FindByNameAsync(userData);

                if (user == null)
                {
                    // Check if recieved data may be an email. Data will be skipped if it may not.
                    if (!_validator.IsValidEmail(userData))
                    {
                        messages.Add($"The user [{userData}] hasn`t been invited. " +
                                     "He hasn`t been found or data isn`t valid as email.");
                        continue;
                    }

                    // Try to find user by email if it may be
                    user = await _userManager.FindByEmailAsync(userData);

                    // In case of user wasn`t found, invite goes to recieved email data
                    if (user == null)
                    {
                        InviteUser(userId, list.Id, userData, null);
                        messages.Add($"The user [{userData}] was invited.");
                        invitedUsers.Add(userData);
                        continue;
                    }
                }

                var invitedGPUser = _gpUserSrv.GetUser(x => x.IdentityId == user.Id);

                InviteUser(userId, list.Id, user.Email, invitedGPUser);
                messages.Add($"The user [{userData}] was invited.");
                invitedUsers.Add(user.Email);
            }

            return new OperationResult()
            {
                Success = true,
                Data = invitedUsers,
                Messages = messages
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
                Data = _securitySrv.GetUsersHaveAccessToWatchList(list)
            };
        }

        // Inviting user procedure
        private void InviteUser
            (Guid userId, Guid listId, string invitedUserEmail, GeoPingUser invitedUser)
        {
            // Check if user was invited. Send one more mail, if he was
            if (IsUserHasBeenInvitedEarlier(invitedUserEmail, listId, out var pastSharing))
            {
                var newGPToken = _tokenSrv.GetSharingInviteToken(pastSharing.Id.ToString());

                SendSharingEmail(userId, pastSharing.Email, newGPToken.Id.ToString());

                return;
            }

            // TODO: CAN I SOMEHOW UNITE CONDITION IF INVITEDUSER != NULL WITHOUT EXTRALARGE CODELINES
            string sharingStatus = "invited";
            Guid? invitedUserId = null;

            if (invitedUser != null)
            {
                sharingStatus = "pending";
                invitedUserId = invitedUser.Id;
            }

            var sharing = _shareRepo.Add(new ListSharing()
            {
                ListId = listId,
                Email = invitedUserEmail,
                Status = sharingStatus,
                UserId = invitedUserId,
                InvitationDate = DateTime.UtcNow
            });

            var gpToken = invitedUser != null
                ? _tokenSrv.GetSharingToken(sharing.Id.ToString())
                : _tokenSrv.GetSharingInviteToken(sharing.Id.ToString());

            SendSharingEmail(userId, sharing.Email, gpToken.Id.ToString());
        }

        private bool IsUserHasBeenInvitedEarlier(string invitedUserEmail, Guid listId, out ListSharing sharing)
        {
            sharing = _shareRepo.Data.FirstOrDefault(x => x.Email == invitedUserEmail &&
                                                          x.ListId == listId);
            if (sharing == null)
            {
                return false;
            }

            return true;
        }

        private void SendSharingEmail(Guid inviterId, string email, string code)
        {
            var inviter = _gpUserSrv.GetUser(x => x.Id == inviterId);

            var callbackUrl = $"{_cfg.GetValue<string>("SiteUrl")}/" +
                              $"{_cfg.GetValue<string>("UrlForAction:ByToken")}/" +
                              $"{code}";

            _emailSvc.Send(new EmailMessage()
            {
                FromAddress = new EmailAddress()
                {
                    Name = "GeopingTeam",
                    Address = "test@geoping.info"
                },
                ToAddress = new EmailAddress()
                {
                    Name = email,
                    Address = email
                },
                Subject = $"User {inviter.FirstName} \"{inviter.Login}\" {inviter.LastName} shared a geolist with you.",
                Content = _emailSvc.GetConfirmationMail(email, callbackUrl)
            });
        }
    }
}
