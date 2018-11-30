using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    public class UserListWasSharedWithDTO
    {
        public Guid? UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid SharingId { get; set; }
        public DateTime SharingDate { get; set; }
        public string SharingStatus { get; set; }
    }
}
