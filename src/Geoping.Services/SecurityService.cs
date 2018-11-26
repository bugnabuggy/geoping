using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Geoping.Services
{
    public class SecurityService : ISecurityService
    {
        private IRepository<ListSharing> _shareRepo;
        private IRepository<GeoPingUser> _userRepo;

        public SecurityService(IRepository<ListSharing> shareRepo,
                               IRepository<GeoPingUser> userRepo)
        {
            _shareRepo = shareRepo;
            _userRepo = userRepo;
        }

        public IEnumerable<object> GetUsersHaveAccessToWatchList(GeoList list)
        {
            var data = _shareRepo.Data
                .Where(x => x.ListId == list.Id);

            var result = _userRepo.Data
                .Where(x => x.Id == list.OwnerId || data.Any(y => y.UserId == x.Id))
                .Select(x => new
                {
                    x.Id,
                    x.Login,
                    x.FirstName,
                    x.LastName,
                    x.Birthday
                });

            return result;
        }

        public IEnumerable<object> GetUsersHaveAccessToManipulateList(GeoList list)
        {
            var result = _userRepo.Data
                .Where(x => x.Id == list.OwnerId)
                .Select(x => new
                {
                    x.Id,
                    x.Login,
                    x.FirstName,
                    x.LastName,
                    x.Birthday
                });

            return result;
        }

        public bool IsUserHasAccessToWatchList(Guid userId, GeoList list)
        {
            ICollection<Guid?> allowedUsers =
                _shareRepo.Data
                    .Where(x => x.ListId == list.Id && 
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
