using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.TestData.Helpers
{
    public class TestConfig
    {
        public const string ConnectionString = "Server=(localdb)\\mssqllocaldb;" +
                                               "Database=aspnet-GeoPing.Api-local-Development;" +
                                               "Trusted_Connection=True;MultipleActiveResultSets=true";

        public const int AsyncOperationWaitTime = 10_000;

        public const string DefaultPassword = "Password@123";
    }
}
