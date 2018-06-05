using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Configuration
{
    public class Constants
    {
        public const int AsyncTaskWaitTime = 10_000;
        public const string ApiName = "api";

        public static Dictionary<Guid, DateTime> AntiforgeryKeys = new Dictionary<Guid, DateTime>();
    }
}
