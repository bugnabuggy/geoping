using System;
using System.Threading.Tasks;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IAccountService
    {
        Task<OperationResult> RegisterAsync(RegisterUserDTO registerUser);
        Task<OperationResult> ChangePasswordAsync(string identityUserId, ChangePasswordDTO changePassword);
        bool IsUserExists(RegisterUserDTO user, out string item);
        bool IsUserExists(string userId);
        Task<OperationResult> ConfirmEmailAsync(string token);
        Task<OperationResult> ConfirmResetAsync(string token, string newPassword);
        OperationResult<GeoPingUser> GetProfile(Guid gpUserId);
        Task<OperationResult<ShortUserInfoDTO>> GetShortProfile(string userId);
        OperationResult<GeoPingUser> EditProfile(Guid loggedUserId, GeoPingUserDTO user);
        OperationResult<GeoPingUser> EditProfileAvatar(Guid guid, ProfileAvatarDTO avatar);
        Task<OperationResult> ResetPassword(ResetPasswordDTO form);
    }
}
