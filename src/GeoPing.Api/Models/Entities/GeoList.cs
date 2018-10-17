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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(240)]
        public string Description { get; set; }

        public string OwnerId { get; set; }

        public DateTime PeriodFrom { get; set; }
        public DateTime PeriodTo { get; set; }

        public int SubscribersNumber { get; set; }

        public bool IsPublic { get; set; }

        public float Rating { get; set; }




        //public ApplicationUser Owner { get; set; }

        //public ICollection<ListReview> Reviews { get; set; }
        //public ICollection<GeoPoint> GeoPoints { get; set; }
        //public ICollection<UserList> UsersLists { get; set; }
    }
}
