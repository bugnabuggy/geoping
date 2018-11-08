using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.Core.Services
{
    public interface IAccountService
    {
        Task<OperationResult> RegisterAsync(RegisterUserDTO registerUser);
        Task<OperationResult> ChangePasswordAsync(string identityUserId, ChangePasswordDTO changePassword);
        bool IsUserExists(RegisterUserDTO user, out string item);
        bool IsUserExists(string userId);
        Task<OperationResult> ConfirmEmailAsync(string userId, string token);
        Task<OperationResult> ConfirmResetAsync(string userId, string token, string newPassword);
        Task ConfirmAccountWithoutEmailAsync(string userEmail);
        OperationResult<GeoPingUser> GetProfile(Guid gpUserId);
        OperationResult<ShortUserInfoDTO> GetShortProfile(Guid userId);
        OperationResult<GeoPingUser> EditProfile(Guid loggedUserId, GeoPingUserDTO user);
        OperationResult<GeoPingUser> EditProfileAvatar(Guid guid, ProfileAvatarDTO avatar);
    }
}
