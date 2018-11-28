using System;
using System.Collections.Generic;

namespace GeoPing.TestData.Data
{
    public class TestUsers
    {
        private ICollection<TestUser> _testUsers = new List<TestUser>
        {
            new TestUser
            {
                UserName = "UserTest",
                Email = "TestUser@test.com",
                Password = "Password123",
                Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                FirstName = "User",
                LastName = "Test",
                PhoneNumber = "+123465789",
                Country = "Greenland",
                Avatar = "avatar1"
            },
            new TestUser
            {
                UserName = "Tester",
                Email = "tester@test.com",
                Password = "Password123",
                Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                FirstName = "Tes",
                LastName = "Ter",
                PhoneNumber = "+987654321",
                Country = "Greenland",
                Avatar = "avatar2"
            }
        };

        public ICollection<TestUser> GetUsers()
        {
            return _testUsers;
        }
    }

    public class TestUser
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string Avatar { get; set; }
    }
}
