using GeoPing.Api.Data;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.TestData.Helpers
{
    public interface IServiceProviderBootstrapper
    {
        ApplicationDbContext GetApplicationDbContext();

        ServiceProvider GetServiceProvider();
        Task<ServiceProvider> GetServiceProviderWithSeedDbAsync();
    }
}
