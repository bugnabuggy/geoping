using GeoPing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInStatsDTO
    {
        public CheckInStatPointDTO Point { get; set; }
        public CheckInStatCheckDTO Check { get; set; }
    }

    public class CheckInStatPointDTO
    {
        public Guid Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Radius { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
    }

    public class CheckInStatCheckDTO
    {
        public Guid? UserId { get; set; }
        public Guid? PointId { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public double? Distance { get; set; }
        public DateTime? Date { get; set; }
        public Guid? DeviceId { get; set; }
        public string Ip { get; set; }
        public string UserAgent { get; set; }
    }
}
