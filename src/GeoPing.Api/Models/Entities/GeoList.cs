using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        public float Rating { get; set; }

        public DateTime PeriodFrom { get; set; }
        public DateTime PeriodTo { get; set; }


        public string OwnerId { get; set; }
        public virtual ApplicationUser Owner { get; set; }

        public virtual IEnumerable<ListReview> Reviews { get; set; }
        public virtual IEnumerable<GeoPoint> GeoPoints { get; set; }
        public virtual IEnumerable<UserList> UsersLists { get; set; }
    }
}
