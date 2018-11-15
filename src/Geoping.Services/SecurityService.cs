using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.Services;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<object> GetUsersHaveAccessToList(GeoList list)
        {
            var data = _shareRepo.Data.Where(x => x.ListId == list.Id);

            var result = _userRepo.Data.Where(x => x.Id == list.OwnerId || 
                                              _shareRepo.Data.Any(y => y.UserId == x.Id))
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
            if (list.OwnerId == userId)
            {
                return true;
            }
            return false;
        }

        public bool IsUserHasAccessToManipulateList(Guid userId, GeoList list)
        {
            if (list.OwnerId == userId)
            {
                return true;
            }
            return false;
        }
    }
}
