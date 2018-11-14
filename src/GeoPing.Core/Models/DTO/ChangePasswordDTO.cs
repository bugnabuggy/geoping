using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class ChangePasswordDTO : NewPasswordDTO 
    {
        public string OldPassword { get; set; }
    }
}
