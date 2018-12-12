using System;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInDTO
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double? Distance { get; set; }
        public Guid DeviceId { get; set; }
        public string Ip { get; set; }
        public string UserAgent { get; set; }
        public string Description { get; set; }
    }
}
