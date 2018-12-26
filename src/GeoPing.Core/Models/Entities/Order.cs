using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid CommodityId { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
