﻿using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class ListSharing
    {
        public Guid Id { get; set; }
        public Guid ListId { get; set; }
        public Guid UserId { get; set; }
        public string Status { get; set; }
        public DateTime InvitationDate { get; set; }
    }
}