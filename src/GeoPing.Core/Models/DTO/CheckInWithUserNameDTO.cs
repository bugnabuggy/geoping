using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class CheckInWithUserNameDTO : CheckInDTO
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public DateTime Date { get; set; }
        public Guid PointId { get; set; }
    }
}
