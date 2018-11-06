using GeoPing.Api.Configuration;
using GeoPing.Infrastructure.Data;
using GeoPing.Infrastructure.Models;
using GeoPing.Utilities.EmailSender;
using GeoPing.Utilities.Logger;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api
{
    public class Startup
    {
        public IHostingEnvironment _environment;
        public IConfigurationRoot _configuration { get; }
        private AppConfigurator _appConfigurator = new AppConfigurator();

        public Startup(IHostingEnvironment environment)
        {
            _environment = environment;


            var builder = new ConfigurationBuilder()
                .SetBasePath(environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                //.AddJsonFile($"appsettings.{environment.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            _configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(_configuration);
            services.AddSingleton<IEmailConfiguration>(_configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>());
            services.AddSingleton(_configuration.GetSection("IdentityServerSettings").Get<IdentityServerSettings>());

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));

            services.AddMvcCore()
                .AddFormatterMappings()
                .AddCacheTagHelper()
                .AddJsonFormatters()
                .AddCors()
                .AddAuthorization(opt =>
                {
                });

            // Setting password requirements 
            services.AddIdentity<AppIdentityUser, IdentityRole>(options => {
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configure IdentityServer with in-memory stores, keys, clients and res
            services.AddIdentityServer(options =>
            options.PublicOrigin = _configuration.GetSection("ServerHost").Value)
                .AddDeveloperSigningCredential()
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<AppIdentityUser>()
                /*
                // this adds the operational data from DB (codes, tokens, consents)
                
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                    {
                        builder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"),
                            sql =>
                            {
                                sql.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
                            });
                    };

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30; // interval in seconds
                })*/;

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
            })
            .AddIdentityServerAuthentication(options =>
            {
                options.Authority = _configuration.GetSection("ServerHost").Value;
                options.RequireHttpsMetadata = false;
                options.ApiName = Constants.ApiName;
                options.ApiSecret = Constants.ClientSecret;
            });

            // Removing cookie authentitication
            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

            // Add application services.
            _appConfigurator.ConfigureServices(services);

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            LoggerConfig.SetSettings();
            loggerFactory.AddGPLog();
          
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler();
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.AllowAnyOrigin();
            });

            app.UseStaticFiles();

            app.UseIdentityServer();

            app.UseMvc();
        }
    }
}
