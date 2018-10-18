using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class ListPoints
    {
        public long Id { get; set; }
        public Guid ListId { get; set; }
        public Guid PointId { get; set; }
    }
}
