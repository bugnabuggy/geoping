using System;

namespace GeoPing.Core.Models.DTO
{
    public class GeoPingUserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
    }
}
