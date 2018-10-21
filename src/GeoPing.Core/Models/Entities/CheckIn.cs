using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class CheckIn
    {
        public Guid Id { get; set; }
        public  Guid PointId { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public double Distance{ get; set; }
        public DateTime Date { get; set; }
        public Guid DeviceId { get; set; }
        public string Ip { get; set; }
        public string UserAgent { get; set; }
    }
}
