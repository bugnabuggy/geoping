using System;

namespace GeoPing.Core.Models.Entities
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
        public virtual GeoList Geolist { get; set; }
    }
}
