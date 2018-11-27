namespace GeoPing.Utilities.EmailSender.Models
{
    public class EmailMessage
    {
        public EmailAddress ToAddress { get; set; }
        public EmailAddress FromAddress { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public EmailMessage()
        {
            ToAddress = new EmailAddress();
            FromAddress = new EmailAddress();
        }
    }
}
