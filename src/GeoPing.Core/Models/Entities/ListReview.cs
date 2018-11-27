using System;

namespace GeoPing.Core.Models.Entities
{
    public class ListReview
    {
        public long Id { get; set; }
        public Guid PublicListId { get; set; }
        public Guid UserId { get; set; }
        public DateTime FinishDate { get; set; }
        public short Rating { get; set; }
    }
}
