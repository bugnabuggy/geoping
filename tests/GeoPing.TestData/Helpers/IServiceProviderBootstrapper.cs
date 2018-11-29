using System;
using System.Threading.Tasks;
using GeoPing.Infrastructure.Data;

namespace GeoPing.TestData.Helpers
{
    public interface IServiceProviderBootstrapper
    {
        ApplicationDbContext GetApplicationDbContext();

        IServiceProvider GetServiceProvider();
        Task<IServiceProvider> GetServiceProviderWithSeedDb();
    }
}
