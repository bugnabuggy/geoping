using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class GeoList
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(240)]
        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public IEnumerable<GeoPoint> GeoPoints { get; set; }

        public IEnumerable<UserLists> UsersLists { get; set; }
    }
}
