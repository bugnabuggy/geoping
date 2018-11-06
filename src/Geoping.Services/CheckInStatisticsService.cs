using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Geoping.Services
{
    public class CheckInStatisticsService : ICheckInStatisticsService
    {
        private IRepository<CheckIn> _checksRepo;

        public CheckInStatisticsService(IRepository<CheckIn> checksRepo)
        {
            _checksRepo = checksRepo;
        }

        public WebResult<CheckInStatDTO> GetStatOfUsersList(string listId, CheckInStatFilterDTO filter)
        {
            throw new NotImplementedException();
        }
    }
}
