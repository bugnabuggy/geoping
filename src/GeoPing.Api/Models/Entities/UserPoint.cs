using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class UserPoint
    {
        [Key]
        public long Id { get; set; }

        public long PointId { get; set; }
        public virtual GeoPoint Point { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public DateTime CheckTime { get; set; }
    }
}
