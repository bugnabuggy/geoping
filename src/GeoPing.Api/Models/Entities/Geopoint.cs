using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class GeoPoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(240)]
        public string Description { get; set; }

        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        [Required]
        public double Radius { get; set; }

        public Guid GeoListId { get; set; }

        //public GeoList GeoList { get; set; }

        //public IEnumerable<UserPoint> UserPoints { get; set; }
    }
}
