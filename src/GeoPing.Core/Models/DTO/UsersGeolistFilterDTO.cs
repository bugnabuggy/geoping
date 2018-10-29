using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class UsersGeolistFilterDTO: GeolistFilterDTO
    {
        public bool? IsPublic { get; set; }
    }
}
