using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class PointCatalog
    {
        public long GeoPointId { get; set; }

        public GeoPoint Point { get; set; }

        public long GeoCatalogId { get; set; }

        public GeoCatalog Catalog { get; set; }
    }
}
