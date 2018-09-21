using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models
{
    public class OperationResult
    {
        public bool Success { get; set; }
        public List<string> Messages { get; set; }
        public virtual IEnumerable<object> Data { get; set; }
    }

    public class OperationResult<T>
    {
        public bool Success { get; set; }
        public List<string> Messages { get; set; }
        public virtual T Data { get; set; }
    }
}
