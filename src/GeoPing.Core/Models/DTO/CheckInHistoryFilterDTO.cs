using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInHistoryFilterDTO : StandartFilterDTO
    {
        public string DatePeriodFrom { get; set; }
        public string DatePeriodTo { get; set; }
    }
}
