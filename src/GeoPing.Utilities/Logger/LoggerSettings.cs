using NLog;
using NLog.Config;
using NLog.Targets;
using NLog.Targets.Syslog;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Utilities.Logger
{
    public class LoggerSettings
    {
        //public static void LogSettings()
        //{
        //    var config = new LoggingConfiguration();


        //    //var syslogTarget = new SyslogTarget();
        //    //{
                
        //    //};
        //    //config.AddTarget(syslogTarget);
        //    //config.AddRule(LogLevel.Debug, LogLevel.Fatal, syslogTarget);


        //    var fileTarget = new FileTarget()
        //    {
        //        FileName = "${basedir}/log1.log",
        //        ArchiveAboveSize = 104857600,
        //        MaxArchiveFiles = 1,
        //    };
        //    config.AddTarget(fileTarget);
        //    config.AddRule(LogLevel.Debug,LogLevel.Fatal,fileTarget);

        //    LogManager.Configuration = config;

        //    }
    }
}
