﻿using System;
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
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GeoPing.Services
{
    public class SharingService : ISharingService
    {
        private IRepository<ListSharing> _sharingRepo;
        private ISecurityService _securitySrv;
        private IGeolistService _listSrv;
        private IGeopingTokenService _tokenSrv;
        private IGeopingUserService _gpUserSrv;
        private UserManager<AppIdentityUser> _userManager;
        private IValidationService _validator;
        private IEmailService _emailSvc;
        private ApplicationSettings _settings;
        private ILogger<SharingService> _logger;

        public SharingService
            (IRepository<ListSharing> sharingRepo,
            ISecurityService securitySrv,
            IGeolistService listSrv,
            IGeopingTokenService tokenSrv,
            IGeopingUserService gpUserSrv,
            UserManager<AppIdentityUser> userManager,
            IValidationService validator,
            IEmailService emailSvc,
            IOptions<ApplicationSettings> settings,
            ILogger<SharingService> logger)
        {
            _sharingRepo = sharingRepo;
            _securitySrv = securitySrv;
            _listSrv = listSrv;
            _tokenSrv = tokenSrv;
            _gpUserSrv = gpUserSrv;
            _userManager = userManager;
            _validator = validator;
            _emailSvc = emailSvc;
            _settings = settings.Value;
            _logger = logger;
        }
        
        public ListSharing Add(ListSharing sub)
        {
            return _sharingRepo.Add(sub);
        }

        public OperationResult AcceptSharing(Guid actingUserId, string sharingId)
        {
            _logger.LogInformation($"Accepting invite to list sharing[{sharingId}] by user[{actingUserId}]");

            var isExist = TryGetSharing(sharingId, out var sharing);

            if (!isExist)
            {
                _logger.LogWarning($"An error occured while accepting invite to list sharing[{sharingId}] " +
                                   $"by user[{actingUserId}]: sharing record doesn`t exist.");

                return new OperationResult
                {
                    Messages = new[] { $"Sharing record with ID = [{sharingId}] doesn`t exist" }
                };
            }

            if (sharing.UserId != actingUserId)
            {
                _logger.LogWarning($"An error occured while accepting invite to list sharing[{sharingId}] " +
                                   $"by user[{actingUserId}]: user has no rights to do this action.");

                return new OperationResult
                {
                    Messages = new[] { "Unauthorized" }
                };
            }

            sharing.Status = "accepted";

            _sharingRepo.Update(sharing);

            _tokenSrv.DeleteSharingTokens(sharingId);

            _logger.LogInformation($"Invite to list sharing[{sharingId}] by user[{actingUserId}] was accepted.");

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "The share invite was accepted." }
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
            _logger.LogInformation($"User[{actingUserId}] tries to share list[{listId}] with another users.");

            // Checks if list is exists
            if (!_listSrv.TryGetListWithId(listId, out var list))
            {
                _logger.LogWarning($"An error occured while sharing list[{listId}] with another users: " +
                                   $"list doesn`t exist.");

                return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
                {
                    Messages = new[] { $"There is no list with id = [{listId}]" }
                };
            }

            // Checks if user have rights to call this method
            if (!_securitySrv.IsUserHasAccessToManipulateList(actingUserId, list))
            {
                _logger.LogWarning($"An error occured while sharing list[{listId}] with another users: " +
                                   $"user[{actingUserId}] has no rights to do this action.");

                return new OperationResult<IEnumerable<UserListWasSharedWithDTO>>
                {
                    Messages = new[] { "Unauthorized" }
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

            _logger.LogDebug($"Following users were invited to list[{listId}] by user[{actingUserId}]", sharings);

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
            if (!_listSrv.TryGetListWithId(listId, out var list))
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
                    Messages = new[] { "Unauthorized" }
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
            _logger.LogInformation($"Refusing invite to sharing list [{sharingId}] by user[{actingUserId}].");

            var isSharingExists = TryGetSharing(sharingId, out var sharing);

            if (!isSharingExists)
            {
                _logger.LogWarning($"An error occured while refusing invite to list sharing [{sharingId}] " +
                                   $"by user[{actingUserId}]: sharing record doesn`t exist.");

                return new OperationResult
                {
                    Messages = new[] { $"Sharing record with ID = [{sharingId}] doesn`t exist." }
                };
            }

            var isUserAllowed = actingUserId == sharing.UserId;

            if (actingUserId != sharing.UserId)
            {
                _logger.LogWarning($"An error occured while refusing invite to list sharing [{sharingId}] " +
                                   $"by user[{actingUserId}]: user has no rights to do this action.");

                return new OperationResult
                {
                    Messages = new[] { "Unauthorized" }
                };
            }

            _sharingRepo.Delete(sharing);

            _logger.LogInformation($"Invite to list sharing[{sharingId}] by user[{actingUserId}] was refused.");

            return new OperationResult
            {
                Success = true,
                Messages = new[] { "You successfully refuse the sharing list." }
            };
        }

        public OperationResult RevokeSharing(Guid ownerUserId, string sharingId)
        {
            _logger.LogInformation($"Refusing invite to sharing list [{sharingId}] by user[{ownerUserId}].");

            var isSharingExists = TryGetSharing(sharingId, out var sharing);

            if (!isSharingExists)
            {
                _logger.LogWarning($"An error occured while revoking invite to list sharing [{sharingId}] " +
                                   $"by user[{ownerUserId}]: sharing record doesn`t exist.");

                return new OperationResult
                {
                    Messages = new[] { $"Sharing record with ID = [{sharingId}] doesn`t exist" }
                };
            }
            
            if (!_securitySrv.IsUserHasAccessToManipulateList
                (ownerUserId, _listSrv.Get().FirstOrDefault(l => l.Id == sharing.ListId)))
            {
                _logger.LogWarning($"An error occured while revoking invite to list sharing [{sharingId}] " +
                                   $"by user[{ownerUserId}]: user has no rights to do this action.");

                return new OperationResult
                {
                    Messages = new[] { "Unauthorized" }
                };
            }

            _sharingRepo.Delete(sharing);

            _logger.LogInformation($"Invite to list sharing[{sharingId}] by user[{ownerUserId}] was revoked.");

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

                SendSharingEmail(userId, invitedUser, pastSharing.Email, newGPToken.Token);

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

            SendSharingEmail(userId, invitedUser, sharing.Email, gpToken.Token);
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

        private void SendSharingEmail(Guid inviterId, GeoPingUser invitedUser, string email, string code)
        {
            var inviter = _gpUserSrv.GetUser(x => x.Id == inviterId);

            var callbackUrl = $"{_settings.Urls.SiteUrl}/" +
                              $"{_settings.Urls.ActionsUrl.ByToken}/" +
                              $"{code}";

            string subject;

            if (invitedUser == null)
            {
                subject = email;
            }
            else
            {
                var fullName = ($"{invitedUser.FirstName} {invitedUser.LastName}").Trim();

                subject = ($"{fullName} \"{invitedUser.Login}\"").TrimStart();
            }

            subject = $"{subject}, user {inviter.FirstName} \"{inviter.Login}\" {inviter.LastName} " +
                      "shared a geolist with you.";
                      
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
                Subject = subject,
                Content = _emailSvc.GetConfirmationMail(email, callbackUrl)
            };

            _emailSvc.Send(message);
        }
        
        public bool DoesSharingExist(Guid listId, string userEmail)
        {
            var sharing = _sharingRepo.Get()
                .FirstOrDefault(sh => sh.ListId == listId && sh.Email == userEmail);

            return sharing != null;
        }

        private bool TryGetSharing(string sharingId, out ListSharing sharing)
        {
            var isId = Guid.TryParse(sharingId, out var id);

            if (!isId)
            {
                sharing = null;

                return false;
            }

            sharing = _sharingRepo.Data.FirstOrDefault(x => x.Id == id);

            return sharing != null;
        }

        private IEnumerable<SharedListInfoDTO> GetSharedListsInfo(IQueryable<ListSharing> sharings)
        {
            var result =
                from sh in sharings
                join l in _listSrv.Get() on sh.ListId equals l.Id
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
