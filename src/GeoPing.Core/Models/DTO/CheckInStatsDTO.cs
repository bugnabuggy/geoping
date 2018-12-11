using System;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInStatsDTO
    {
        public Guid? UserId { get; set; }
        public Guid? PointId { get; set; }
        public Guid? CheckInId { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public double? Radius { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double? Distance { get; set; }
        public DateTime? CheckInDate { get; set; }
        public string Type { get; set; }
    }
}
