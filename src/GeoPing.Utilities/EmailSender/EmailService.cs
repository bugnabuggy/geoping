using GeoPing.Core;
using GeoPing.Utilities.EmailSender.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace GeoPing.Utilities.EmailSender
{
    public class EmailService : IEmailService
    {
        private readonly ApplicationSettings _settings;

        public EmailService(IOptions<ApplicationSettings> settings)
        {
            _settings = settings.Value;
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
                emailClient.Connect
                    (_settings.EmailSender.SmtpServer,
                    _settings.EmailSender.SmtpPort,
                    _settings.EmailSender.UseSecureConnection);

                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");

                emailClient.Authenticate
                    (_settings.EmailSender.SmtpUserName,
                    _settings.EmailSender.SmtpPassword);

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
