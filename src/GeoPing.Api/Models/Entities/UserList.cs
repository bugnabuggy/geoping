using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class UserList
    {
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public long ListId { get; set; }
        public virtual GeoList GeoList { get; set; }

        public bool IsTrusted { get; set; }
    }
}
