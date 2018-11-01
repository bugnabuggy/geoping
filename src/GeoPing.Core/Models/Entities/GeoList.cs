using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class GeoList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Edited { get; set; }
        public bool IsPublic { get; set; }

        // Relational fields
        public PublicList Publiclist { get; set; }
        public ICollection<GeoPoint> Geopoints { get; set; }
    }
}
