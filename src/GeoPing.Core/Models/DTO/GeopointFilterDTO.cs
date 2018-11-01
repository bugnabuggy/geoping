using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Core.Models.DTO
{
    public class GeopointFilterDTO : StandartFilterDTO
    {
        public string Name { get; set; }
        public string OnAddress { get; set; }
    }
}
