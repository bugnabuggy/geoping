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
        private IValidationService _validator;
        private IEmailService _emailSvc;
        private IConfiguration _cfg;

        public SharingService(IRepository<ListSharing> shareRepo,
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
            _listSrv = listSrv;
            _tokenSrv = tokenSrv;
            _gpUserSrv = gpUserSrv;
            _userManager = userManager;
            _validator = validator;
            _emailSvc = emailSvc;
            _cfg = cfg;
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

        //public OperationResult InviteByEmail(Guid userId, string listId, string email)
        //{
        //    // TODO: REFACTOR THIS. IT MAY BE UNITED SOMEHOW
        //    // ↓↓↓↓↓↓↓
        //    if (!_listSrv.IsListExistWithThisId(listId, out var list))
        //    {
        //        return new OperationResult()
        //        {
        //            Messages = new[] { $"There is no list with id = [{listId}]" }
        //        };
        //    }

        //    if (!_securitySrv.IsUserHasAccessToWatchList(userId, list))
        //    {
        //        return new OperationResult()
        //        {
        //            Messages = new[] { "You are not allowed to do this" }
        //        };
        //    }
        //    // ↑↑↑↑↑↑↑

        //    if (IsUserHasBeenInvited(userId, list.Id))
        //    {
        //        return new OperationResult()
        //        {
        //            Messages = new[] { $"User with this email = [{email}] was invited some time ago." }
        //        };
        //    }

        //    return new OperationResult()
        //    {
        //        Data = _tokenSrv.GetSharingToken(email, listId),
        //        Success = true,
        //        Messages = new[] { $"Invite for user with email = [{email}] has been sent." }
        //    };
        //}

        //public async Task<OperationResult> ConfirmInvitationAsync(string invitedUserId, string token)
        //{
        //    var data = _tokenSrv.DecodeSharingToken(token);

        //    var email = (string)data[0];
        //    var listId = (string)data[1];

        //    if (!_listSrv.IsListExistWithThisId(listId, out var list))
        //    {
        //        return new OperationResult()
        //        {
        //            Messages = new[] { $"There is no list with id = [{listId}]" }
        //        };
        //    }

        //    var invitedUser = await _userManager.FindByEmailAsync(email);

        //    if (invitedUser == null)
        //    {
        //        return new OperationResult()
        //        {
        //            Data = "302-1",
        //            Messages = new[] { "You should register in our service to continue using it" }
        //        };
        //    }

        //    if (invitedUserId == null)
        //    {
        //        return new OperationResult()
        //        {
        //            Data = "302-2",
        //            Messages = new[] { "You should sign in our service to continue using it" }
        //        };
        //    }

        //    if (invitedUserId != invitedUser.Id)
        //    {
        //        return new OperationResult()
        //        {
        //            Messages = new[] { "You have no rights to do this" }
        //        };
        //    }

        //    return new OperationResult()
        //    {
        //        Data = _shareRepo.Add(new ListSharing()
        //        {
        //            InvitationDate = DateTime.UtcNow,
        //            ListId = list.Id,
        //            UserId = _gpUserSrv.GetUser(x => x.IdentityId == invitedUser.Id).Id,
        //            Status = "invited"
        //        }),
        //        Messages = new[] { "You confirmed invite to list. " +
        //        "Now accept invitation to be able to watch list and check in its points" },
        //        Success = true
        //    };
        //}

        //public OperationResult AcceptInvite(Guid guid, string listId)
        //{
        //    throw new NotImplementedException();
        //}

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

            var gpToken = _tokenSrv.GetSharingInviteToken(sharing.Id.ToString());

            SendSharingEmail(userId, sharing.Email, gpToken.Id.ToString());
        }

        private bool IsUserHasBeenInvitedEarlier(string invitedUserEmail,Guid listId, out ListSharing sharing)
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
