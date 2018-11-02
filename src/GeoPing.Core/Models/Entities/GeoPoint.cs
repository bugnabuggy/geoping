using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class GeoPoint
    {
        public Guid Id { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public double Radius { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }

        // Relational fields
        public Guid ListId { get; set; }
        public virtual GeoList Geolist { get; set; }
    }
}
