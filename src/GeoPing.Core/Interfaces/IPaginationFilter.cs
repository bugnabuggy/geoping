using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Core.Interfaces
{
    public interface IPaginationFilter
    {
        int? PageSize { get; set; }
        int? PageNumber { get; set; } 
    }
}
