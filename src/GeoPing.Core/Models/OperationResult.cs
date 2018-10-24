using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Core.Models
{
    public class OperationResult
    {
        public bool Success { get; set; }
        public IEnumerable<string> Messages { get; set; }
        public virtual object Data { get; set; }
    }

    public class OperationResult<T>
    {
        public bool Success { get; set; }
        public IEnumerable<string> Messages { get; set; }
        public virtual T Data { get; set; }
    }
}
