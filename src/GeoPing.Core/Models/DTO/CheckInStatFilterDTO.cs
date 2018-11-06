using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInStatFilterDTO : StandartFilterDTO
    {
        public string ListId { get; set; }
        public string UserId { get; set; }
        public string DatePeriodFrom { get; set; }
        public string DatePeriodTo { get; set; }        
    }
}
