using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Utilities.EmailSender
{
    public interface IEmailService
    {
        void Send(EmailMessage message);
        string GetConfirmationMail(string username, string link);
    }
}
