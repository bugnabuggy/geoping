using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class PublicList
    {
        public Guid Id { get; set; }
        public DateTime PublishDate { get; set; }
        public double Rating { get; set; }
        public int SubscribersNumber { get; set; }
        public int FinishersNumber { get; set; }
        public bool IsOfficial { get; set; }

        // Relational fields
        public Guid ListId { get; set; }
        public GeoList Geolist { get; set; }
    }
}
