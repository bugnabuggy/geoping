using GeoPing.Api.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.DTO
{
    public class StandartFilterDTO : IOrderFilter, IPaginationFilter
    {
        public string OrderBy { get; set; }
        public bool IsDesc { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
    }
}
