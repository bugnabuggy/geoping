using System;

namespace GeoPing.Core.Models.Entities
{
    public class CheckIn
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Distance{ get; set; }
        public DateTime Date { get; set; }
        public Guid DeviceId { get; set; }
        public string Ip { get; set; }
        public string UserAgent { get; set; }

        // Relational fields
        public Guid PointId { get; set; }
        public virtual GeoPoint Geopoint { get; set; }
    }
}
