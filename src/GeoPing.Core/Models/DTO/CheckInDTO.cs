using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInDTO
    {
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public double Distance { get; set; }
    }
}
