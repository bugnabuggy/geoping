using System;
using GeoPing.Api.Configuration;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace GeoPing.TestData.Helpers
{
    public class DataBaseDiBootstrapperInMemory : IServiceProviderBootstrapper
    {
        public ApplicationDbContext GetApplicationDbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseInMemoryDatabase("TestInMemory");
            var ctx = new ApplicationDbContext(optionsBuilder.Options);
            return ctx;
        }

        public IServiceProvider GetServiceProvider()
        {
            var services = new ServiceCollection();
            services.AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<ApplicationDbContext>(opt => opt.UseInMemoryDatabase("TestDB"));

            services.AddIdentity<AppIdentityUser, IdentityRole>()
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

        public IServiceProvider GetServiceProviderWithSeedDb()
        {
            var provider = GetServiceProvider();
            var dbSeed = new TestDbContextInitializer();
            dbSeed.SeedData(provider);

            return provider;
        }
    }
}
