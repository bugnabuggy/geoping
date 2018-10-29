using GeoPing.Api.Interfaces;
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
using System.Linq;
using System.Text;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class GeolistServiceTests
    {
        private IServiceProvider _services;
        private IGeolistService sut;

        private IRepository<GeoList> _geolistRepo;
        private IRepository<PublicList> _publicGeolistRepo;
        private IRepository<GeoPingUser> _gpUserRepo;

        private Guid _newListId = Guid.Parse("00000000-0000-0000-0000-000000000001");
        private Guid _gpUserId = Guid.Parse("136b1014-7ee6-48f9-3645-08d63a3de1b6");

        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _geolistRepo = _services.GetRequiredService<IRepository<GeoList>>();
            _publicGeolistRepo = _services.GetRequiredService<IRepository<PublicList>>();
            _gpUserRepo = _services.GetRequiredService<IRepository<GeoPingUser>>();

            sut = new GeolistService(_geolistRepo, _publicGeolistRepo, _gpUserRepo);
        }


        [Test]
        public void Should_add_new_list()
        {
            var testList = new GeoList()
            {
                Id = _newListId,
                Name = "test",
                OwnerId = _gpUserId
            };

            var result = sut.Add(testList);

            Assert.That(result.Success);

            var data = _geolistRepo.Data.Where(x => x.Id == _newListId).FirstOrDefault();

            Assert.That(data != null);
            Assert.That(data.OwnerId == _gpUserId);
        }
        
        [Test]
        public void Should_add_new_public_list()
        {
            var testList = new GeoList()
            {
                Id = _newListId,
                Name = "test",
                OwnerId = _gpUserId,
                IsPublic = true
            };

            var result = sut.Add(testList);

            Assert.That(result.Success);
            Assert.That(result.Data != null);
            Assert.That(result.Data.OwnerId == _gpUserId);

            var data = _publicGeolistRepo.Data.Where(x => x.ListId == _newListId).FirstOrDefault();

            Assert.That(data != null);
            Assert.That(data.PublishDate != null);
        }
        /*
        [Test]
        public void Should_get_user_list()
        {
            sut.Add(new )
        }
        /*
        [Test]
        public void Should_add_new_list()
        {

        }
        /*
        [Test]
        public void Should_add_new_list()
        {

        }
        /*
        [Test]
        public void Should_add_new_list()
        {

        }
        /*
        [Test]
        public void Should_add_new_list()
        {

        }
        /*
        [Test]
        public void Should_add_new_list()
        {

        }*/
    }
}
