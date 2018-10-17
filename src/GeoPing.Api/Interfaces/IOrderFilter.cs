using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Interfaces
{
    public interface IOrderFilter
    {
        string OrderBy { get; set; }
        bool IsDesc { get; set; }
    }
}
