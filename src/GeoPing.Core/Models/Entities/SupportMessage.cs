using System;

namespace GeoPing.Core.Models.Entities
{
    public class SupportMessage
    {
        public long Id { get; set; }
        public Guid UserId { get; set; }
        public string Topic { get; set; }
        public string Message{ get; set; }
        public DateTime Created { get; set; }
        public string Status { get; set; }
        public bool IsClosed { get; set; }
    }
}
