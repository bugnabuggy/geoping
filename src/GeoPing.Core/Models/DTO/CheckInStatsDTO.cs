using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInStatsDTO
    {
        public Guid PointId { get; set; }
        public string PointLatitude { get; set; }
        public string PointLongitude { get; set; }
        public double PointRadius { get; set; }
        public string PointName { get; set; }
        public string PointDescription { get; set; }
        public string PointAddress { get; set; }

        public Guid UserId { get; set; }
        public double CheckLatitude { get; set; }
        public double CheckLongitude { get; set; }
        public double CheckDistance { get; set; }
        public DateTime CheckDate { get; set; }
        public Guid DeviceId { get; set; }
        public string Ip { get; set; }
        public string UserAgent { get; set; }
    }
}
