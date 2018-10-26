using GeoPing.Infrastructure.Data;
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

        IServiceProvider GetServiceProvider();
        IServiceProvider GetServiceProviderWithSeedDb();
    }
}
