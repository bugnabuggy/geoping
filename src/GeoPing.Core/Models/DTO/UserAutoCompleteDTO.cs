using System;

namespace GeoPing.Core.Models.DTO
{
    public class UserAutoCompleteDTO
    {
        public Guid UserId { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
