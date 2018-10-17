using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.DTO
{
    public class GeopointFilterDTO : StandartFilterDTO
    {
        public string NameContains { get; set; }
    }
}
