﻿using System;

namespace GeoPing.Core.Models.Entities
{
    public class ListSharing
    {
        public Guid Id { get; set; }
        public Guid ListId { get; set; }
        public virtual GeoList List { get; set; }
        public Guid? UserId { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public DateTime InvitationDate { get; set; }
    }
}
