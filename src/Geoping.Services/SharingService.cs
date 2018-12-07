using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.Utilities.EmailSender;
using GeoPing.Utilities.EmailSender.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace GeoPing.Services
{
    public class SharingService : ISharingService
    {
        private IRepository<ListSharing> _sharingRepo;
        private IRepository<GeoList> _listRepo;
        private ISecurityService _securitySrv;
        private IGeolistService _listSrv;
        private IGeopingTokenService _tokenSrv;
        private IGeopingUserService _gpUserSrv;
        private UserManager<AppIdentityUser> _userManager;
        private IValidationService _validator;
        private IEmailService _emailSvc;
        private ApplicationSettings _settings;

        public SharingService
            (IRepository<ListSharing> sharingRepo,
            IRepository<GeoList> listRepo,
            ISecurityService securitySrv,
            IGeolistService listSrv,
            IGeopingTokenService tokenSrv,
            IGeopingUserService gpUserSrv,
            UserManager<AppIdentityUser> userManager,
            IValidationService validator,
            IEmailService emailSvc,
            IOptions<ApplicationSettings> settings)
        {
            _sharingRepo = sharingRepo;
            _securitySrv = securitySrv;
            _listRepo = listRepo;
            _listSrv = listSrv;
            _tokenSrv = tokenSrv;
            _gpUserSrv = gpUserSrv;
            _userManager = userManager;
            _validator = validator;
            _emailSvc = emailSvc;
            _settings = settings.Value;
        }


        public OperationResult AcceptSharing(Guid actingUserId, string sharingId)
        {
            var isExist = IsSharingExists(sharingId, out var sharing);

            if (!isExist)
            {
                return new OperationResult
                {
                    Messages = new[] { $"Sharing record with ID = [{sharingId}] doesn`t exist" }
                };
            }

            if (sharing.UserId == actingUserId)
            {
                sharing.Status = "accepted";

                _sharingRepo.Update(sharing);

                _tokenSrv.DeleteSharingTokens(sharingId);

                return new OperationResult
                {
                    Success = true,
                    Messages = new[] { "The share invite was accepted." }
                };
            }

            return new OperationResult
            {
                Messages = new[] { "Unauthorized" }
            };
        }

        public void ConfirmSharingsWithRegistration(string sharingId, Guid userId, string email)
        {
            var sharing = _sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(sharingId));

            if (sharing == null) return;

            if (sharing.Email != email) return;

            var sharings = _sharingRepo.Data.Where(x => x.Email == email);

            foreach (var sh in sharings)
            {
                sh.UserId = userId;
                sh.Status = "pending";
            }

            _sharingRepo.Update(sharings);
        }

        // Send sharing invitations to users in list
        public async Task<OperationResult<IEnumerable<UserListWasSharedWithDTO>>> InviteUsersByList(Guid actingUserId, string listId, string[] usersData)
        {
            // Checks if list is exists
            if (!_listSrv.IsListExistWithThisId(listId, out var list))
            {
                return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            // Checks if user have rights to call this method
            if (!_securitySrv.IsUserHasAccessToManipulateList(actingUserId, list))
            {
                return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
                {
                    Messages = new[] { "You are not allowed to do this" }
                };
            }

            var messages = new List<string>();
            var sharings = new List<ListSharing>();

            foreach (var userData in usersData)
            {
                // Try to find user by username one by one
                var user = await _userManager.FindByNameAsync(userData);

                ListSharing sharing;

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
                        sharing = InviteUser(actingUserId, list.Id, userData, null);

                        if (sharing != null)
                        {
                            sharings.Add(sharing);
                        }

                        messages.Add($"The user [{userData}] was invited.");
                        continue;
                    }
                }

                var invitedGPUser = _gpUserSrv.GetUser(x => x.IdentityId == user.Id);

                if (invitedGPUser.Id == actingUserId)
                {
                    messages.Add("You can`t invite yourself");
                    continue;
                }

                sharing = InviteUser(actingUserId, list.Id, user.Email, invitedGPUser);

                if (sharing != null)
                {
                    sharings.Add(sharing);
                }

                messages.Add($"The user [{userData}] was invited.");
                continue;
            }

            var success = sharings.Any();

            return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
            {
                Success = success,
                Data = GetUsersListWasSharedWithInfo(sharings.AsQueryable()),
                Messages = messages
            };
        }

        public IEnumerable<UserAutoCompleteDTO> GetAutoCompletedUsersList(string query)
        {
            return _gpUserSrv.GetUsersShortInfoList(query);
        }

        public IEnumerable<SharedListInfoDTO> GetListsSharedWith(Guid userId)
        {
            var sharings = _sharingRepo.Get(x => x.UserId == userId);

            return GetSharedListsInfo(sharings);
        }

        public IEnumerable<SharedListInfoDTO> GetListsSharedWith(Guid userId, string sharingStatus)
        {
            var sharings = _sharingRepo.Get(x => x.UserId == userId &&
                                                 x.Status == sharingStatus);

            return GetSharedListsInfo(sharings);
        }

        public OperationResult<IEnumerable<UserListWasSharedWithDTO>>
            GetUsersListWasSharedWith(Guid userId, string listId)
        {
            var isListExists = _listSrv.IsListExistWithThisId(listId, out var list);

            if (list == null)
            {
                return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToWatchList(userId, list))
            {
                return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
                {
                    Messages = new[] { "Unauthorized", "You are not allowed to do this" }
                };
            }

            var result = GetUsersListWasSharedWithInfo(_sharingRepo.Get(x => x.ListId == list.Id));

            return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
            {
                Success = true,
                Messages = new[] { $"List with ID = [{listId}] was shared with following users" },
                Data = result
            };
        }

        public OperationResult RefuseSharing(Guid actingUserId, string sharingId)
        {
            var isSharingExists = IsSharingExists(sharingId, out var sharing);

            if (!isSharingExists)
            {
                return new OperationResult
                {
                    Messages = new[] { $"Sharing record with ID = [{sharingId}] doesn`t exist." }
                };
            }

            var isUserAllowed = actingUserId == sharing.UserId;

            if (actingUserId == sharing.UserId)
            {
                _sharingRepo.Delete(sharing);

                return new OperationResult
                {
                    Success = true,
                    Messages = new[] { "You successfully refuse the sharing list." }
                };
            }

            return new OperationResult
            {
                Messages = new[] { "You are not allowed to do this." }
            };
        }

        public OperationResult RevokeSharing(Guid ownerUserId, string sharingId)
        {
            var isSharingExists = IsSharingExists(sharingId, out var sharing);

            if (!isSharingExists)
            {
                return new OperationResult
                {
                    Messages = new[] { $"Sharing record with ID = [{sharingId}] doesn`t exist" }
                };
            }

            var sharedList = _listRepo.Get().FirstOrDefault(x => x.Id == sharing.ListId);

            if (sharedList == null)
            {
                return new OperationResult
                {
                    Messages = new[] { $"Shared list doesn`t exist" }
                };
            }

            if (!_securitySrv.IsUserHasAccessToManipulateList(ownerUserId, sharedList))
            {
                return new OperationResult
                {
                    Messages = new[] { "You are not allowed to do this." }
                };
            }

            _sharingRepo.Delete(sharing);

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "You successfully revoke the sharing list" }
            };
        }

        // Inviting user procedure
        private ListSharing InviteUser
            (Guid userId, Guid listId, string invitedUserEmail, GeoPingUser invitedUser)
        {
            // Check if user was invited. Send one more mail, if he was
            if (IsUserHasBeenInvitedEarlier(invitedUserEmail, listId, out var pastSharing))
            {
                var newGPToken = pastSharing.UserId == null
                    ? _tokenSrv.CreateSharingInviteToken(pastSharing.Id.ToString())
                    : _tokenSrv.CreateSharingToken(pastSharing.Id.ToString());

                SendSharingEmail(userId, pastSharing.Email, newGPToken.Token);

                return null;
            }

            // TODO: CAN I SOMEHOW UNITE CONDITION IF INVITEDUSER != NULL WITHOUT EXTRALARGE CODELINES
            string sharingStatus = "invited";
            Guid? invitedUserId = null;

            if (invitedUser != null)
            {
                sharingStatus = "pending";
                invitedUserId = invitedUser.Id;
            }

            var sharing = _sharingRepo.Add(new ListSharing
            {
                ListId = listId,
                Email = invitedUserEmail,
                Status = sharingStatus,
                UserId = invitedUserId,
                InvitationDate = DateTime.UtcNow
            });

            var gpToken = invitedUser != null
                ? _tokenSrv.CreateSharingToken(sharing.Id.ToString())
                : _tokenSrv.CreateSharingInviteToken(sharing.Id.ToString());

            SendSharingEmail(userId, sharing.Email, gpToken.Token);
            return sharing;
        }

        private bool IsUserHasBeenInvitedEarlier(string invitedUserEmail, Guid listId, out ListSharing sharing)
        {
            sharing = _sharingRepo.Get().FirstOrDefault(x => x.Email == invitedUserEmail &&
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

            var callbackUrl = $"{_settings.Urls.SiteUrl}/" +
                              $"{_settings.Urls.ActionsUrl.ByToken}/" +
                              $"{code}";

            var message = new EmailMessage
            {
                FromAddress = new EmailAddress
                {
                    Name = "GeopingTeam",
                    Address = _settings.EmailSender.SmtpUserName
                },
                ToAddress = new EmailAddress
                {
                    Name = email,
                    Address = email
                },
                Subject = $"User {inviter.FirstName} \"{inviter.Login}\" {inviter.LastName} shared a geolist with you.",
                Content = _emailSvc.GetConfirmationMail(email, callbackUrl)
            };

            _emailSvc.Send(message);
        }

        private bool IsSharingExists(string sharingId, out ListSharing sharing)
        {
            var isId = Guid.TryParse(sharingId, out var id);
            sharing = null;

            if (isId)
            {
                sharing = _sharingRepo.Data.FirstOrDefault(x => x.Id == id);

                if (sharing != null)
                {
                    return true;
                }
            }

            return false;
        }

        private IEnumerable<SharedListInfoDTO> GetSharedListsInfo(IQueryable<ListSharing> sharings)
        {
            var result =
                from sh in sharings
                join l in _listRepo.Get() on sh.ListId equals l.Id
                join u in _gpUserSrv.GetUsers(x => true) on l.OwnerId equals u.Id
                select new SharedListInfoDTO
                {
                    ListId = l.Id,
                    ListName = l.Name,
                    ListDescription = l.Description,
                    ListOwnerId = l.OwnerId,
                    ListCreated = l.Created,
                    ListEdited = l.Edited,
                    ListIsPublic = l.IsPublic,
                    ShareId = sh.Id,
                    ShareStatus = sh.Status,
                    ShareInvitationDate = sh.InvitationDate.ToUniversalTime(),
                    OwnerUserName = u.Login,
                    OwnerFullName = ($"{u.FirstName} {u.LastName}").Trim()
                };

            return result.AsEnumerable();
        }

        private IEnumerable<UserListWasSharedWithDTO> GetUsersListWasSharedWithInfo(IQueryable<ListSharing> sharings)
        {
            var result =
                from sh in sharings
                join u in _gpUserSrv.GetUsers(x => true) on sh.UserId equals u.Id into data
                from x in data.DefaultIfEmpty()
                select new UserListWasSharedWithDTO()
                {
                    SharingId = sh.Id,
                    SharingDate = sh.InvitationDate,
                    SharingStatus = sh.Status,
                    UserId = x != null ? x.Id : (Guid?)null,
                    UserName = x != null ? x.Login : sh.Email,
                    FirstName = x != null ? x.FirstName : null,
                    LastName = x != null ? x.LastName : null,
                };

            return result;
        }
    }
}
