using GeoPing.Infrastructure.Data;
using System;

namespace GeoPing.TestData.Helpers
{
    public interface IServiceProviderBootstrapper
    {
        ApplicationDbContext GetApplicationDbContext();

        IServiceProvider GetServiceProvider();
        IServiceProvider GetServiceProviderWithSeedDb();
    }
}
