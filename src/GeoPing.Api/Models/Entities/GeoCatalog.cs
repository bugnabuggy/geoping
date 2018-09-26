using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class GeoCatalog
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(140)]
        public string Name { get; set; }

        public bool isPublic { get; set; }

        public IEnumerable<PointCatalog> PointCatalogs { get; set; }
    }
}
