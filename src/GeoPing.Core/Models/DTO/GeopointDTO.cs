using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class GeopointDTO
    {
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public double Radius { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
    }
}
