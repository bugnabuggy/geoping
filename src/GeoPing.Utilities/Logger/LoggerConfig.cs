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

            // Syslog common target
            if (settings.SyslogCommon.IsEnable)
            {
                var syslogTargetCommon = new SyslogTarget
                {
                    Name = "sysLogCommon",
                    MessageCreation = new MessageBuilderConfig
                    {
                        Facility = Facility.Daemons
                    },
                    MessageSend = new MessageTransmitterConfig
                    {
                        Protocol = ProtocolType.Udp,
                        Udp = new UdpConfig()
                        {
                            Server = settings.SyslogCommon.Server,
                            Port = settings.SyslogCommon.Port,
                            ConnectionCheckTimeout = 10000,
                            ReconnectInterval = 1000
                        }
                    }
                };

                config.AddTarget(syslogTargetCommon);
                config.AddRule
                    (LogLevel.FromString(settings.SyslogCommon.Level),
                    LogLevel.Warn,
                    syslogTargetCommon);
            }

            // Syslog business target
            if (settings.SyslogBusiness.IsEnable)
            {
                var syslogTargetBusiness = new SyslogTarget
                {
                    Name = "syslogBusiness",
                    MessageCreation = new MessageBuilderConfig
                    {
                        Facility = Facility.Daemons
                    },
                    MessageSend = new MessageTransmitterConfig
                    {
                        Protocol = ProtocolType.Udp,
                        Udp = new UdpConfig()
                        {
                            Server = settings.SyslogBusiness.Server,
                            Port = settings.SyslogBusiness.Port,
                            ConnectionCheckTimeout = 10000,
                            ReconnectInterval = 1000
                        }
                    }
                };

                config.AddTarget(syslogTargetBusiness);
                config.AddRule
                    (LogLevel.FromString(settings.SyslogBusiness.Level),
                    LogLevel.Fatal,
                    syslogTargetBusiness,
                    nameof(GeoPing) + "*");
            }

            // File common target object
            var fileCommonTarget = new FileTarget("fileCommonLogger")
            {
                FileName = settings.FileCommon.Directory,
                ArchiveAboveSize = 104857600,
                MaxArchiveFiles = 1
            };
            config.AddTarget(fileCommonTarget);
            config.AddRule
                (LogLevel.FromString(settings.FileCommon.Level), 
                LogLevel.Fatal, 
                fileCommonTarget);

            // File business target object
            var fileBusinessTarget = new FileTarget("fileBusinessLogger")
            {
                FileName = settings.FileBusiness.Directory,
                ArchiveAboveSize = 104857600,
                MaxArchiveFiles = 1
            };
            config.AddTarget(fileBusinessTarget);
            config.AddRule
                (LogLevel.FromString(settings.FileBusiness.Level), 
                LogLevel.Fatal, 
                fileBusinessTarget,
                nameof(GeoPing) + "*");

            // Activate configuration object
            LogManager.Configuration = config;
        }
    }
}
