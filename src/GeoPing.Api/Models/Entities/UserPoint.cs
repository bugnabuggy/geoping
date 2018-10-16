using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class UserPoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public Guid PointId { get; set; }
        //public GeoPoint Point { get; set; }

        public string UserId { get; set; }
        //public ApplicationUser User { get; set; }

        public DateTime CheckTime { get; set; }
    }
}
