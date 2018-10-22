using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Utilities.EmailSender
{
    public class EmailConfiguration : IEmailConfiguration
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public bool UseAuthentication { get; set; }
        public bool UseSecureConnection { get; set; }
        public string SmtpUserName { get; set; }
        public string SmtpPassword { get; set; }
    }
}