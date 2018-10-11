using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace GeoPing.Api.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        
        public short AccountType { get; set; }

        public virtual IEnumerable<GeoList> OwnedLists { get; set; }
        public virtual IEnumerable<ListReview> UserReviews { get; set; }

        public virtual IEnumerable<UserPoint> GeoPoints { get; set; }
        public virtual IEnumerable<UserList> GeoLists { get; set; }
    }
}
