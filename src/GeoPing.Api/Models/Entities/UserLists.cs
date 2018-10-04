using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class UserLists
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public bool IsTrusted { get; set; }

        public long ListId { get; set; }
        public GeoList GeoList { get; set; }
    }
}
