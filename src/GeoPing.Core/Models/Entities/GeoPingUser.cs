using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class GeoPingUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public DateTime Birthday { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string AccountType { get; set; }
        public DateTime LastPaid { get; set; }
        public bool IsActivated { get; set; }
        public string IdentityId { get; set; }
        public string Avatar { get; set; }
    }
}
