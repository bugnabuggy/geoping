using System;

namespace GeoPing.Core.Models.DTO
{
    public class TokenInfoDTO
    {
        public string TokenType { get; set; }
        public Guid? UserId { get; set; }
        public string UserData { get; set; }
    }
}
