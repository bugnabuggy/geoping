using NLog;
using NLog.Common;
using NLog.Config;
using NLog.Targets;
using NLog.Targets.Syslog;
using NLog.Targets.Syslog.Settings;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Utilities.Logger
{
    public static class LoggerSettings
    {
        public static void SetSettings()
        {
            // Enable internal logging to a file
            InternalLogger.LogFile = "C:/logs/nlog-internal.log";

            // Set internal log level
            InternalLogger.LogLevel = LogLevel.Trace;

            // Configuration object
            var config = new LoggingConfiguration();

            var syslogTarget = new SyslogTarget()
            {
                Name = "sysLog",
                MessageCreation = new MessageBuilderConfig()
                {
                    Facility = NLog.Targets.Syslog.Settings.Facility.Daemons
                },
                MessageSend = new MessageTransmitterConfig()
                {
                    Protocol = ProtocolType.Tcp,
                    Tcp = new TcpConfig()
                    {
                        Server = "logs7.papertrailapp.com",
                        Port = 51378,
                        Tls = new TlsConfig()
                        {
                            Enabled = true
                        }
                    }
                }

            };
            config.AddTarget(syslogTarget);
            config.AddRule(LogLevel.Debug, LogLevel.Fatal, syslogTarget);

            // FileTarget object
            var fileTarget = new FileTarget("fileLogger")
            {
                FileName = "${basedir}/log.log",
                ArchiveAboveSize = 104857600,
                MaxArchiveFiles = 1,
            };

            config.AddTarget(fileTarget);

            // Define rules for target
            config.AddRule(LogLevel.Debug, LogLevel.Fatal, fileTarget);

            // Activate configuration object
            LogManager.Configuration = config;
        }
    }
}
