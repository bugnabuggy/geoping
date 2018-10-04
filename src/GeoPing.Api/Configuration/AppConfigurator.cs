using GeoPing.Api.Interfaces;
using GeoPing.Api.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public class AppConfigurator
    {
        public static void ConfigureServices(IServiceCollection service)
        {
            service.AddTransient<IEmailSender, EmailSender>();

            service.AddScoped<IGeopointService, GeopointService>();
            service.AddScoped<IGeolistService, GeolistService>();
        }
    }
}
