using GeoPing.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.TestData.Data
{
    public class TestLists
    {
        private ICollection<GeoList> Geolists = new List<GeoList>()
        {
            new GeoList
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Name = "TestList1",
                OwnerId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Created = DateTime.UtcNow
            },
            new GeoList
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Name = "TestList2",
                OwnerId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Created = DateTime.UtcNow
            },
            new GeoList
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                Name = "TestList3",
                OwnerId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Created = DateTime.UtcNow,
                IsPublic = true
            },
            new GeoList
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000004"),
                Name = "TestList4",
                OwnerId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Created = DateTime.UtcNow,
                IsPublic = true
            }
        };

        public ICollection<GeoList> GetGeolists()
        {
            return Geolists;
        }
    }
}
