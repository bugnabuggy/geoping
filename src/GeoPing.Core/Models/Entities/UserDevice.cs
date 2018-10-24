﻿using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Entities
{
    public class UserDevice
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Camera { get; set; }
        public string Microphone { get; set; }
        public string Serial { get; set; }
    }
}
