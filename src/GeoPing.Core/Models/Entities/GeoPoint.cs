using System;

namespace GeoPing.Core.Models.Entities
{
    public class GeoPoint
    {
        public Guid Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Radius { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }

        // Relational fields
        public Guid ListId { get; set; }
        public virtual GeoList Geolist { get; set; }
    }
}
