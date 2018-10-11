using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Api.Configuration;
using GeoPing.Api.Data;
using GeoPing.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace GeoPing.TestData.Helpers
{
    class DataBaseDiBootstrapperInMemory : IServiceProviderBootstrapper
    {
        public ApplicationDbContext GetApplicationDbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseInMemoryDatabase("TestInMemory");
            var ctx = new ApplicationDbContext(optionsBuilder.Options);
            return ctx;
        }

        public ServiceProvider GetServiceProvider()
        {
            var services = new ServiceCollection();
            services.AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<ApplicationDbContext>(opt => opt.UseInMemoryDatabase("TestDB"));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            var httpContext = new DefaultHttpContext();
            httpContext.Features.Set<IHttpAuthenticationFeature>(new HttpAuthenticationFeature());

            services.AddTransient<IHttpContextAccessor>(h => new HttpContextAccessor { HttpContext = httpContext });

            var appConfigurator = new AppConfigurator();
            appConfigurator.ConfigureServices(services);

            services.AddSingleton<IConfiguration>(c => new Mock<IConfiguration>().Object);

            var serviceProvider = services.BuildServiceProvider();

            return serviceProvider;
        }

        public async Task<ServiceProvider> GetServiceProviderWithSeedDb()
        {
            var provider = GetServiceProvider();
            var dbSeed = new TestDbContextInitializer();
            await dbSeed.SeedData(provider);

            return provider;
        }
    }
}
