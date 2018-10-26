using GeoPing.Api.Configuration;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.TestData.Helpers
{
    public class DataBaseDiBootstrapperSQLserver : IServiceProviderBootstrapper
    {
        private static object _contextLock = new object();
        private static bool _contextInitialized = false;
        private static int _contextCount = 0;
        private static DbContextOptions<ApplicationDbContext> _options;

        // not for resharper or vs studio test runners, have to be separat test runner project! to use config
        //private static NameValueCollection _settings = ConfigurationManager.AppSettings;


        static DataBaseDiBootstrapperSQLserver()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer(TestConfig.ConnectionString);
            _options = optionsBuilder.Options;
        }

        public static ApplicationDbContext GetApplicationDbContext()
        {
            var ctx = new ApplicationDbContext(_options);

            if (_contextCount < 1)
            {
                //clean befor new test session starts
                //ctx.Database.EnsureDeleted();
                //ctx.Database.EnsureCreated();
            }

            lock (_contextLock)
            {
                if (!_contextInitialized)
                {
                    _contextInitialized = true;
                    ctx.Database.EnsureDeleted();
                    ctx.Database.EnsureCreated();
                }
            }

            _contextCount++;
            return ctx;
        }

        public static bool DisposeDataContext(ApplicationDbContext ctx)
        {
            if (_contextCount < 2)
            {
                // leave it for investigate information after test run
                //ctx.Database.EnsureDeleted();
            }
            ctx.Dispose();

            _contextCount--;
            return true;
        }

        ApplicationDbContext IServiceProviderBootstrapper.GetApplicationDbContext()
        {
            return GetApplicationDbContext();
        }

        public IServiceProvider GetServiceProvider()
        {
            var services = new ServiceCollection();
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(TestConfig.ConnectionString));

            services.AddIdentity<AppIdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            var httpContext = new DefaultHttpContext();
            httpContext.Features.Set<IHttpAuthenticationFeature>(new HttpAuthenticationFeature());
            services.AddSingleton<IHttpContextAccessor>(h => new HttpContextAccessor { HttpContext = httpContext });

            var appConfigurator = new AppConfigurator();
            appConfigurator.ConfigureServices(services);

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
