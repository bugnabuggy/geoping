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
                Name = "premium_10_minutes",
                Quantity = 600
            },
            new Commodity()
            {
                Cost = 100,
                Name = "premium_1_week",
                Quantity = 604800
            }
        };

        public ICollection<Commodity> Get()
        {
            return commodities;
        }
    }
}
