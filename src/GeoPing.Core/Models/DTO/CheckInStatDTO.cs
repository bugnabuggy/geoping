using GeoPing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInStatDTO
    {
        public Guid ListId { get; set; }
        public string ListName { get; set; }
        IEnumerable<CheckIn> ChecksIn { get; set; }
    }
}
