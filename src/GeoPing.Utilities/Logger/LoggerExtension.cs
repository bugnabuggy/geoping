using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Extensions.Logging;

namespace GeoPing.Utilities.Logger
{
    public static class LoggerExtension
    {
        public static ILoggerFactory AddGPLog(this ILoggerFactory loggerFactory)
        {
            return loggerFactory.AddNLog();
        }
    }
}
