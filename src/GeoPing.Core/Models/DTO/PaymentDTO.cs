using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models.DTO
{
    // 
    public class PaymentDTO
    {
        public PaymentAmountDTO amount { get; set; }
        public PaymentConfirmationDTO confirmation { get; set; }
        public bool capture { get; set; }
        public string description { get; set; }
    }

    public class PaymentAmountDTO
    {
        public string value { get; set; }
        public string currency { get; set; }
    }

    public class PaymentConfirmationDTO
    {
        public string type { get; set; }
        public string return_url { get; set; }
    }
}
