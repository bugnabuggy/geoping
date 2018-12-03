using GeoPing.Core;
using Microsoft.Extensions.Options;
using NLog;
using NLog.Common;
using NLog.Config;
using NLog.Targets;
using NLog.Targets.Syslog;
using NLog.Targets.Syslog.Settings;

namespace GeoPing.Utilities.Logger
{
    public class LoggerConfig
    {
        public static void SetSettings(IOptions<ApplicationSettings> settings)
        {
            LoggerSettings _settings = settings.Value.Logger;

            if (_settings.InternalLog.IsEnabled)
            {
                // Enable internal logging to a file
                InternalLogger.LogFile = _settings.InternalLog.Directory;

                // Set internal log level
                InternalLogger.LogLevel = LogLevel.FromString(_settings.InternalLog.Level);
            }

            // Configuration object
            var config = new LoggingConfiguration();

            var syslogTarget = new SyslogTarget
            {
                Name = "sysLog",
                MessageCreation = new MessageBuilderConfig
                {
                    Facility = Facility.Local7
                },
                MessageSend = new MessageTransmitterConfig
                {
                    Protocol = ProtocolType.Tcp,
                    Tcp = new TcpConfig
                    {
                        Server = _settings.Syslog.Server,
                        Port = _settings.Syslog.Port,
                        Tls = new TlsConfig
                        {
                            Enabled = true
                        }
                    }
                }

            };

            config.AddTarget(syslogTarget);
            config.AddRule(LogLevel.FromString(_settings.Syslog.Level), LogLevel.Fatal, syslogTarget);

            // FileTarget object
            var fileTarget = new FileTarget("fileLogger")
            {
                FileName = _settings.File.Directory,
                ArchiveAboveSize = 104857600,
                MaxArchiveFiles = 1
            };

            config.AddTarget(fileTarget);

            // Define rules for target
            config.AddRule(LogLevel.FromString(_settings.File.Level), LogLevel.Fatal, fileTarget);

            // Activate configuration object
            LogManager.Configuration = config;
        }
    }
}
