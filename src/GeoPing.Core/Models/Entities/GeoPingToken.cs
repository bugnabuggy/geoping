using System;

namespace GeoPing.Core.Models.Entities
{
    public class GeoPingToken
    {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public bool IsUsed { get; set; }
    }
}
