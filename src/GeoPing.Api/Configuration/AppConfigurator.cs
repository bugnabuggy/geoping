using GeoPing.Api.Data;
using GeoPing.Api.Interfaces;
using GeoPing.Api.Models.Entities;
using GeoPing.Api.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Configuration
{
    public static class AppConfigurator
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRepository<GeoList>,DbRepository<GeoList>>();
            services.AddScoped<IRepository<GeoPoint>, DbRepository<GeoPoint>>();
            services.AddScoped<IRepository<UserPoint>, DbRepository<UserPoint>>();

            services.AddTransient<IEmailSender, EmailSender>();

            services.AddScoped<IGeopointService, GeopointService>();
            services.AddScoped<IGeolistService, GeolistService>();
            services.AddScoped<IClaimsHelper, ClaimsHelper>();
        }
    }
}
