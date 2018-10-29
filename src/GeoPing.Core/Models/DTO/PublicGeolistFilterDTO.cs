using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class PublicGeolistFilterDTO : GeolistFilterDTO
    {
        public string Author { get; set; }
        public string DatePublishFrom { get; set; }
        public string DatePublishTo { get; set; }
        public double? RatingFrom { get; set; }
        public double? RatingTo { get; set; }
        public int? SubsFrom { get; set; }
        public int? SubsTo { get; set; }
        public int? FinishersFrom { get; set; }
        public int? FinishersTo { get; set; }
        public bool? IsOfficial { get; set; }
    }
}
