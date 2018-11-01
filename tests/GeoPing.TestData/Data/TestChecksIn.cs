using GeoPing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.TestData.Data
{
    public class TestChecksIn
    {
        private ICollection<CheckIn> ChecksIn = new List<CheckIn>()
        {
            new CheckIn
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Latitude = "55",
                Longitude = "75",
                Distance = 0,
                Date = DateTime.UtcNow,
                UserId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                PointId = Guid.Parse("10000000-0000-0000-0000-000000000001")
            },
            new CheckIn
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Latitude = "55",
                Longitude = "75",
                Distance = 0,
                Date = DateTime.UtcNow,
                UserId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                PointId = Guid.Parse("10000000-0000-0000-0000-000000000001")
            },
            new CheckIn
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                Latitude = "55",
                Longitude = "75",
                Distance = 0,
                Date = DateTime.UtcNow,
                UserId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                PointId = Guid.Parse("10000000-0000-0000-0000-000000000002")
            },
            new CheckIn
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000004"),
                Latitude = "55",
                Longitude = "75",
                Distance = 0,
                Date = DateTime.UtcNow,
                UserId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                PointId = Guid.Parse("10000000-0000-0000-0000-000000000002")
            },
        };

        public ICollection<CheckIn> GetChecksIn()
        {
            return ChecksIn;
        }
    }
}
