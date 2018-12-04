using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;

namespace GeoPing.Services
{
    public class SecurityService : ISecurityService
    {
        private IRepository<ListSharing> _sharingRepo;
        private IRepository<GeoPingUser> _userRepo;

        public SecurityService(IRepository<ListSharing> sharingRepo,
                               IRepository<GeoPingUser> userRepo)
        {
            _sharingRepo = sharingRepo;
            _userRepo = userRepo;
        }

        public IEnumerable<GeoPingUser> GetUsersHaveAccessToWatchList(GeoList list)
        {
            var data = _sharingRepo.Get(x => x.ListId == list.Id);

            var result = _userRepo.Get(x => x.Id == list.OwnerId || data.Any(y => y.UserId == x.Id));

            return result;
        }

        public IEnumerable<GeoPingUser> GetUsersHaveAccessToManipulateList(GeoList list)
        {
            var result = _userRepo.Get(x => x.Id == list.OwnerId);

            return result;
        }

        public bool IsUserHasAccessToWatchList(Guid userId, GeoList list)
        {
            ICollection<Guid?> allowedUsers =
                _sharingRepo
                    .Get(x => x.ListId == list.Id && 
                              x.UserId != null && 
                              x.Status == "accepted")
                    .Select(x => x.UserId).ToList();

            allowedUsers.Add(list.OwnerId);

            return allowedUsers.Contains(userId);
        }

        public bool IsUserHasAccessToManipulateList(Guid userId, GeoList list)
        {
            ICollection<Guid?> allowedUsers = new List<Guid?>();

            allowedUsers.Add(list.OwnerId);

            return allowedUsers.Contains(userId);
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
