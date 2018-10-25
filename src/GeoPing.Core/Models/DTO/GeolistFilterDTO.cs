using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Core.Models.DTO
{
    public class GeolistFilterDTO: StandartFilterDTO
    {
        public string NameContains { get; set; }
        public string OwnerId { get; set; }
        public bool? isPublic { get; set; }
        public int? SubsNumberFrom { get; set; }
        public int? SubsNumberTo { get; set; }
        public float? RatingFrom { get; set; }
        public float? RatingTo { get; set; }
        public string PeriodFrom { get; set; }
        public string PeriodTo { get; set; }
    }
}
