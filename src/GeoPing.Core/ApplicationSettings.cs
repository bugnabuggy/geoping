using System.Collections.Generic;

namespace GeoPing.Core
{
    public class ApplicationSettings
    {
        public AutoCompleteSettings AutoComplete { get; set; }
        public DefaultUserSettings DefaultUser { get; set; }
        public EmailSenderSettings EmailSender { get; set; }
        public GeopingTokenSettings GeopingToken { get; set; }
        public LoggerSettings Logger { get; set; }
        public UrlsSettings Urls { get; set; }
        public YandexCashSettings YandexCash { get; set; }
    }

    public class YandexCashSettings
    {
        public string StoreId { get; set; }
        public string Key { get; set; }
        public string RedirectPage { get; set; }
    }

    public class GeopingTokenSettings
    {
        public TokenLifetimeSettings TokenLifetime { get; set; }
    }

    public class TokenLifetimeSettings
    {
        public int Sharing { get; set; }
        public int SharingInvite { get; set; }
        public int ConfirmEmail { get; set; }
        public int ConfirmReset { get; set; }

        public int GetValue(string type)
        {
            var value = new Dictionary<string, int>
            {
                { "Sharing", Sharing },
                { "SharingInvite", SharingInvite },
                { "ConfirmEmail", ConfirmEmail },
                { "ConfirmReset", ConfirmReset }
            };

            return value[type];
        }
    }

    public class AutoCompleteSettings
    {
        public int MinCharsToAutoComplete { get; set; }
        public int SizeOfAutoCompletedList { get; set; }
    }

    public class DefaultUserSettings
    {
        public static string AvatarImage { get; set; }
    }

    public class LoggerSettings
    {
        public bool IsScopesIncluded { get; set; }
        public string LogLevelDefault { get; set; }
        public InternalLogSettings InternalLog { get; set; }
        public FileTargetSettings FileCommon { get; set; }
        public FileTargetSettings FileBusiness { get; set; }
        public SyslogTargetSettings SyslogCommon { get; set; }
        public SyslogTargetSettings SyslogBusiness { get; set; }
    }

    public class InternalLogSettings
    {
        public bool IsEnabled { get; set; }
        public string Directory { get; set; }
        public string Level { get; set; }
    }

    public class FileTargetSettings
    {
        public string Directory { get; set; }
        public string Level { get; set; }
    }

    public class SyslogTargetSettings
    {
        public bool IsEnable { get; set; }
        public string Server { get; set; }
        public int Port { get; set; }
        public string Level { get; set; }
    }

    public class EmailSenderSettings
    {
        public bool IsEmailConfirmEnable { get; set; }
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public bool UseAuthentication { get; set; }
        public bool UseSecureConnection { get; set; }
        public string SmtpUserName { get; set; }
        public string SmtpPassword { get; set; }
    }

    public class UrlsSettings
    {
        public string ApiUrl { get; set; }
        public string SiteUrl { get; set; }
        public ActionsUrlSettings ActionsUrl { get; set; }
    }

    public class ActionsUrlSettings
    {
        public string ConfirmEmail { get; set; }
        public string ConfirmReset { get; set; }
        public string ByToken { get; set; }
    }
}
