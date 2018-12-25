using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoPing.Core.Models.Entities
{
    public class Commodity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; } // Cost in Rubles. Maybe it is temporary.
        public int Quantity { get; set; } // Duration in seconds or number
    }
}
