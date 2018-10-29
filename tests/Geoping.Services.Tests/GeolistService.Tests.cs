﻿using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Geoping.Services.Tests
{
    [TestFixture]
    public class GeolistServiceTests
    {
        private IServiceProvider _services;
        private IGeolistService sut;

        private IRepository<GeoList> _geolistRepo;
        private IRepository<PublicList> _publicGeolistRepo;
        private IRepository<GeoPingUser> _gpUserRepo;

        private Guid _gpUserId;

        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _geolistRepo = _services.GetRequiredService<IRepository<GeoList>>();
            _publicGeolistRepo = _services.GetRequiredService<IRepository<PublicList>>();
            _gpUserRepo = _services.GetRequiredService<IRepository<GeoPingUser>>();

            sut = new GeolistService(_geolistRepo, _publicGeolistRepo, _gpUserRepo);

            _gpUserId = Guid.Parse("136b1014-7ee6-48f9-3645-08d63a3de1b6");
        }


        [Test]
        public void Should_add_new_list()
        {
            var newList = new GeoList()
            {

            };
        }
        /*
        [Test]
        public void Should_add_new_list()
        {

        }

        [Test]
        public void Should_add_new_list()
        {

        }

        [Test]
        public void Should_add_new_list()
        {

        }

        [Test]
        public void Should_add_new_list()
        {

        }

        [Test]
        public void Should_add_new_list()
        {

        }

        [Test]
        public void Should_add_new_list()
        {

        }

        [Test]
        public void Should_add_new_list()
        {

        }*/
    }
}
