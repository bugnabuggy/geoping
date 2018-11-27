using GeoPing.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.TestData.Data
{
    public class TestSharings
    {
        private readonly ICollection<ListSharing> _sharings = new List<ListSharing>()
        {
            new ListSharing
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                ListId = Guid.Parse("11000000-0000-0000-0000-000000000001"),
                Email = "test1@test.com",
                InvitationDate = DateTime.UtcNow,
                Status = "accepted",
                UserId = Guid.Parse("10000000-0000-0000-0000-000000000001")
            },
            new ListSharing
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                ListId = Guid.Parse("11000000-0000-0000-0000-000000000001"),
                Email = "test2@test.com",
                InvitationDate = DateTime.UtcNow,
                Status = "pending",
                UserId = Guid.Parse("10000000-0000-0000-0000-000000000002")
            },
            new ListSharing
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                ListId = Guid.Parse("11000000-0000-0000-0000-000000000002"),
                Email = "test1@test.com",
                InvitationDate = DateTime.UtcNow,
                Status = "invited",
                UserId = null
            },
            new ListSharing
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000004"),
                ListId = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                Email = "test2@test.com",
                InvitationDate = DateTime.UtcNow,
                Status = "pending",
                UserId = Guid.Parse("10000000-0000-0000-0000-000000000002")
            }
        };

        public ICollection<ListSharing> GetListSharings()
        {
            return _sharings;
        }
    }
}
