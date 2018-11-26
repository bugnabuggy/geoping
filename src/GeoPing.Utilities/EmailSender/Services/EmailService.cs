using GeoPing.Utilities.EmailSender.Interfaces;
using GeoPing.Utilities.EmailSender.Models;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;

namespace GeoPing.Utilities.EmailSender.Services
{
    public class EmailService : IEmailService
    {
        private readonly IEmailConfiguration _emailCfg;

        public EmailService(IEmailConfiguration emailCfg)
        {
            _emailCfg = emailCfg;
        }

        public void Send(EmailMessage msg)
        {
            var message = new MimeMessage();

            message.To.Add(new MailboxAddress(msg.ToAddress.Name, msg.ToAddress.Address));
            message.From.Add(new MailboxAddress(msg.FromAddress.Name, msg.FromAddress.Address));

            message.Subject = msg.Subject;
            message.Body = new TextPart(TextFormat.Html)
            {
                Text = msg.Content
            };

            using (var emailClient = new SmtpClient())
         {
                emailClient.Connect(_emailCfg.SmtpServer, _emailCfg.SmtpPort, _emailCfg.UseSecureConnection);
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");
                emailClient.Authenticate(_emailCfg.SmtpUserName, _emailCfg.SmtpPassword);
                emailClient.Send(message);
                emailClient.Disconnect(true);
            }
        }

        public string GetConfirmationMail(string username, string link)
        {
            return new ConfirmationEmail(username, link).GetMail();
        }
    }
}
