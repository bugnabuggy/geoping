using System;
using System.Collections.Generic;
using System.Text;
using GeoPing.Core.Models.Enums;

namespace GeoPing.Core.Models.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public string PaymentId { get; set; }
        public Guid UserId { get; set; }
        public Guid CommodityId { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public Guid? IdempotenceKey { get; set; }
        public PaymentOperators PaymentOperator { get; set; }
    }
}
