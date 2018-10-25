using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Core.Models
{
    public class WebResult : OperationResult
    {
        public int TotalItems { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }

    public class WebResult<T> : OperationResult<T>
    {
        public int TotalItems { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
