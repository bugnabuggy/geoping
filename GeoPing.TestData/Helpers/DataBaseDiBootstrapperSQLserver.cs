using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Api.Data;
using Microsoft.Extensions.DependencyInjection;

namespace GeoPing.TestData.Helpers
{
    class DataBaseDiBootstrapperSQLserver : IServiceProviderBootstrapper
    {
        public ApplicationDbContext GetApplicationDbContext()
        {
            throw new NotImplementedException();
        }

        public ServiceProvider GetServiceProvider()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceProvider> GetServiceProviderWithSeedDb()
        {
            throw new NotImplementedException();
        }
    }
}
