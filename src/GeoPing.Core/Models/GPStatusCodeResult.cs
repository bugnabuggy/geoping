using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Core.Models
{
    public class GPStatusCodeResult
    {
        public int StatusCode { get; }
        public string Message { get; }

        public GPStatusCodeResult(int statusCode)
        {
            StatusCode = statusCode;
        }

        public GPStatusCodeResult(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
    }
}
