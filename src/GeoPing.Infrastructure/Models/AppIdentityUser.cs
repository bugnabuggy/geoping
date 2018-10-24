using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Infrastructure.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class AppIdentityUser : IdentityUser
    {
        public Guid GPUserID { get; set; }
    }
}
