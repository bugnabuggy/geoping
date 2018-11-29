using System;
using System.Collections.Generic;
using GeoPing.Core.Models.Entities;

namespace GeoPing.TestData.Data
{
    public class TestLists
    {
        private readonly ICollection<GeoList> _geolists = new List<GeoList>()
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

        private readonly ICollection<PublicList> _publicGeolists = new List<PublicList>()
        {
            new PublicList()
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                PublishDate = DateTime.UtcNow,
                ListId = Guid.Parse("10000000-0000-0000-0000-000000000003")
            },
            new PublicList()
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                PublishDate = DateTime.UtcNow,
                ListId = Guid.Parse("10000000-0000-0000-0000-000000000004")
            },
        };

        public ICollection<GeoList> GetGeolists()
        {
            return _geolists;
        }

        public ICollection<PublicList> GetPublicGeolists()
        {
            return _publicGeolists;
        }
    }
}
