using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using TimeZone = GeoPing.Core.Models.Entities.TimeZone;

namespace GeoPing.Services
{
    public class UtilityService: IUtilityService
    {
        private IRepository<Country> _countryRepo;
        private IRepository<TimeZone> _timezoneRepo;

        public UtilityService
            (IRepository<Country> countryRepo,
            IRepository<TimeZone> timezoneRepo)
        {
            _countryRepo = countryRepo;
            _timezoneRepo = timezoneRepo;
        }

        public IEnumerable<Country> GetCountries()
        {
            return _countryRepo.Get().AsEnumerable();
        }

        public IEnumerable<TimeZone> GetTimeZones()
        {
            return _timezoneRepo.Get().AsEnumerable();
        }
    }
}
