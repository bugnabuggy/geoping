using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class TokenInfoDTO
    {
        public string TokenType { get; set; }
        public string Value { get; set; }
        public Guid? UserId { get; set; }
    }
}
