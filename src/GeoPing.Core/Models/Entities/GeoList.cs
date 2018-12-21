using System;

namespace GeoPing.Core.Models.Entities
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
        public string Period { get; set; }
    }
}
