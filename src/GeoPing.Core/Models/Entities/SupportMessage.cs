using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
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
