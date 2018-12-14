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
                config.AddRule
                    (LogLevel.FromString(settings.SyslogCommon.Level), 
                    LogLevel.Warn, 
                    syslogTargetCommon); 
            }

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
                        Protocol = ProtocolType.Tcp,
                        Tcp = new TcpConfig
                        {
                            Server = settings.SyslogBusiness.Server,
                            Port = settings.SyslogBusiness.Port,
                            Tls = new TlsConfig
                            {
                                Enabled = true
                            }
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
