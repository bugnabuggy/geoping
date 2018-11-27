using System;
using System.Collections.Generic;
using GeoPing.Core.Models.Entities;

namespace GeoPing.TestData.Data
{
    public class TestPoints
    {
        private readonly ICollection<GeoPoint> _geopoints = new List<GeoPoint>()
        {
            new GeoPoint
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Name = "TestPoint1",
                Longitude = 75,
                Latitude = 55,
                ListId = Guid.Parse("10000000-0000-0000-0000-000000000001")
            },
            new GeoPoint
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Name = "TestPoint2",
                Longitude = 75,
                Latitude = 55,
                ListId = Guid.Parse("10000000-0000-0000-0000-000000000001")
            },
            new GeoPoint
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                Name = "NotTestPoint3",
                Longitude = 75,
                Latitude = 55,
                ListId = Guid.Parse("10000000-0000-0000-0000-000000000001")
            },
            new GeoPoint
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000004"),
                Name = "TestPoint4",
                Longitude = 75,
                Latitude = 55,
                ListId = Guid.Parse("10000000-0000-0000-0000-000000000002")
            }
        };

        public ICollection<GeoPoint> GetGeopoints()
        {
            return _geopoints;
        }
    }
}
