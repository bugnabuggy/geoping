using System;
using GeoPing.Infrastructure.Data;

namespace GeoPing.TestData.Helpers
{
    public interface IServiceProviderBootstrapper
    {
        ApplicationDbContext GetApplicationDbContext();

        IServiceProvider GetServiceProvider();
        IServiceProvider GetServiceProviderWithSeedDb();
    }
}
