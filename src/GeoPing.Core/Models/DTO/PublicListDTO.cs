using System;

namespace GeoPing.Core.Models.DTO
{
    public class PublicListDTO 
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public string OwnerName { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime EditDate { get; set; }
        public DateTime PublishDate { get; set; }
        public double Rating { get; set; }
        public int SubscribersNumber { get; set; }
        public int FinishersNumber { get; set; }
        public bool IsOfficial { get; set; }
    }
}
