using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class GeoPingToken
    {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public bool IsUsed { get; set; }
    }
}
