using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class ListReview
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public float Rating { get; set; }

        [MaxLength(240)]
        public string Comment { get; set; }

        public string UserId { get; set; }
        // public ApplicationUser User { get; set; }

        public Guid ListId { get; set; }
        // public GeoList List { get; set; }
    }
}
