using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;

namespace GeoPing.Services
{
    public class CommodityService: ICommodityService
    {
        private IRepository<Commodity> _commodityRepo;

        public CommodityService(IRepository<Commodity> commodityRepo)
        {
            _commodityRepo = commodityRepo;
        }

        public IEnumerable<Commodity> Get()
        {
            return _commodityRepo.Get();
        }
    }
}
