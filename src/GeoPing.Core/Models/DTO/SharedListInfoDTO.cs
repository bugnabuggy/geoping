using System;

namespace GeoPing.Core.Models.DTO
{
    public class SharedListInfoDTO
    {
        public Guid ListId { get; set; }
        public Guid ShareId { get; set; }
        public string ListName{ get; set; }
        public string ListDescription { get; set; }
        public Guid ListOwnerId { get; set; }
        public DateTime ListCreated { get; set; }
        public DateTime ListEdited { get; set; }
        public bool ListIsPublic { get; set; }
        public string ShareStatus { get; set; }
        public DateTime ShareInvitationDate { get; set; }
    }
}
