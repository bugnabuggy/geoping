using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;

namespace GeoPing.Services
{
    public class SecurityService : ISecurityService
    {
        private IRepository<ListSharing> _sharingRepo;
        private IRepository<GeoPingUser> _userRepo;
        private UserManager<AppIdentityUser> _userManager;

        public SecurityService
            (IRepository<ListSharing> sharingRepo,
            IRepository<GeoPingUser> userRepo,
            UserManager<AppIdentityUser> userManager)
        {
            _sharingRepo = sharingRepo;
            _userRepo = userRepo;
            _userManager = userManager;
        }

        public IEnumerable<GeoPingUser> GetUsersHaveAccessToWatchList(GeoList list)
        {
            var sharings = _sharingRepo.Get(x => x.ListId == list.Id);

            var result = _userRepo.Get(x => x.Id == list.OwnerId || 
                                            sharings.Any(y => y.UserId == x.Id && 
                                                              y.Status == "accepted"));
            return result;
        }

        public async Task<IEnumerable<GeoPingUser>> GetUsersHaveAccessToManipulateList(GeoList list)
        {
            var result = _userRepo.Get(x => x.Id == list.OwnerId);

            var adminIdentities = await _userManager.GetUsersInRoleAsync("admin");

            return result.Concat(_userRepo.Get(x => adminIdentities.Any(y => y.Id == x.IdentityId)));
        }

        public bool IsUserHasAccessToWatchList(Guid userId, GeoList list)
        {
            var users = GetUsersHaveAccessToWatchList(list);

            return users.Any(u => u.Id == userId);
        }

        public async Task<bool> IsUserHasAccessToManipulateList(Guid userId, GeoList list)
        {
            var users = await GetUsersHaveAccessToManipulateList(list);

            return users.Any(u => u.Id == userId);
        }

        public string GetSHA256HashString(string value)
        {
            using (SHA256 hash = SHA256.Create())
            {
                byte[] bytes = hash.ComputeHash(Encoding.UTF8.GetBytes(value));

                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < bytes.Length; i++)
                {
                    sb.Append(bytes[i].ToString("x2"));
                }

                return sb.ToString();
            }
        }
    }
}
