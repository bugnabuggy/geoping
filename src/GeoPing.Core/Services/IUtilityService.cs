using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Core.Models.Entities;
using TimeZone = GeoPing.Core.Models.Entities.TimeZone;

namespace GeoPing.Core.Services
{
    public interface IUtilityService
    {
        IEnumerable<Country> GetCountries();
        IEnumerable<TimeZone> GetTimeZones();
    }
}
