using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Models
{
    public class TMUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
