using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Api.Configuration.SeededData
{
    public class CommoditiesForSeed
    {
        private ICollection<Commodity> commodities = new List<Commodity>()
        {
            new Commodity()
            {
                Cost = 100,
                Name = "premium",
                Quantity = 30
            }
        };

        public ICollection<Commodity> Get()
        {
            return commodities;
        }
    }
}
