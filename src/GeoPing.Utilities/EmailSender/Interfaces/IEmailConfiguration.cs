using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Utilities.EmailSender
{
    public interface IEmailConfiguration
    {
        string SmtpServer { get; }
        int SmtpPort { get; }
        bool UseAuthentication { get; set; }
        bool UseSecureConnection { get; set; }
        string SmtpUserName { get; set; }
        string SmtpPassword { get; set; }
    }
}
