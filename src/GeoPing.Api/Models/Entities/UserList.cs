using GeoPing.Api.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Models.Entities
{
    public class UserList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string UserId { get; set; }
        //public ApplicationUser User { get; set; }

        public Guid ListId { get; set; }
        //public GeoList GeoList { get; set; }

        public AssessLevel AssessLevel { get; set; }
    }
}
