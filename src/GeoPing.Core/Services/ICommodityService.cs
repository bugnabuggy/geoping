using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface ICommodityService
    {
        IEnumerable<Commodity> Get();
    }
}
