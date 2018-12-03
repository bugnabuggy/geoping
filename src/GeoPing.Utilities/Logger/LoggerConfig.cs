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
        public static void SetSettings(IOptions<ApplicationSettings> options)
        {
            LoggerSettings settings = options.Value.Logger;

            if (settings.InternalLog.IsEnabled)
            {
                // Enable internal logging to a file
                InternalLogger.LogFile = settings.InternalLog.Directory;

                // Set internal log level
                InternalLogger.LogLevel = LogLevel.FromString(settings.InternalLog.Level);
            }

            // Configuration object
            var config = new LoggingConfiguration();

            var syslogTargetCommon = new SyslogTarget
            {
                Name = "sysLogCommon",
                MessageCreation = new MessageBuilderConfig
                {
                    Facility = Facility.Local7
                },
                MessageSend = new MessageTransmitterConfig
                {
                    Protocol = ProtocolType.Tcp,
                    Tcp = new TcpConfig
                    {
                        Server = settings.SyslogCommon.Server,
                        Port = settings.SyslogCommon.Port,
                        Tls = new TlsConfig
                        {
                            Enabled = true
                        }
                    }
                }

            };
            config.AddTarget(syslogTargetCommon);
            config.AddRule(LogLevel.FromString(settings.SyslogCommon.Level), LogLevel.Fatal, syslogTargetCommon);

            var syslogTargetError = new SyslogTarget
            {
                Name = "sysLogError",
                MessageCreation = new MessageBuilderConfig
                {
                    Facility = Facility.Local7
                },
                MessageSend = new MessageTransmitterConfig
                {
                    Protocol = ProtocolType.Tcp,
                    Tcp = new TcpConfig
                    {
                        Server = settings.SyslogCommon.Server,
                        Port = settings.SyslogCommon.Port,
                        Tls = new TlsConfig
                        {
                            Enabled = true
                        }
                    }
                }

            };
            config.AddTarget(syslogTargetError);
            config.AddRule(LogLevel.FromString(settings.SyslogError.Level), LogLevel.Fatal, syslogTargetError);

            // FileTarget object
            var fileTarget = new FileTarget("fileLogger")
            {
                FileName = settings.File.Directory,
                ArchiveAboveSize = 104857600,
                MaxArchiveFiles = 1
            };
            config.AddTarget(fileTarget);
            config.AddRule(LogLevel.FromString(settings.File.Level), LogLevel.Fatal, fileTarget);

            // Activate configuration object
            LogManager.Configuration = config;
        }
    }
}
