using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInHistoryDTO
    {
        public DateTime CheckInDate { get; set; }
        public string LatLng { get; set; }
        public string ListName { get; set; }
        public string Info { get; set; }
    }
}
