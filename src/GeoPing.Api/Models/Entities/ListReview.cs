using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class ListReview
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public float Rating { get; set; }

        [MaxLength(240)]
        public string Comment { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public long ListId { get; set; }
        public virtual GeoList List { get; set; }
    }
}
