using System;
using System.Collections.Generic;

namespace GeoPing.Core.Models.DTO
{
    public class ShortUserInfoDTO
    {
        public string UserName { get; set; }
        public string Avatar { get; set; }
        public Guid UserId { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
