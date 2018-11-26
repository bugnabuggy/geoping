using GeoPing.Utilities.EmailSender.Models;

namespace GeoPing.Utilities.EmailSender.Interfaces
{
    public interface IEmailService
    {
        void Send(EmailMessage message);
        string GetConfirmationMail(string username, string link);
    }
}
