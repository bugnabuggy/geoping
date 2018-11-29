﻿using System;
using System.Linq;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class GeolistServiceTests
    {
        private IServiceProvider _services;
        private IGeolistService _sut;

        private IRepository<GeoList> _geolistRepo;
        private IRepository<PublicList> _publicGeolistRepo;
        private IRepository<GeoPingUser> _gpUserRepo;
        private ISecurityService _securitySrv;

        private Guid _expectedUserId1 = Guid.Parse("10000000-0000-0000-0000-000000000001");
        private Guid _expectedUserId2 = Guid.Parse("10000000-0000-0000-0000-000000000002");

        private Guid _listId1 = Guid.Parse("10000000-0000-0000-0000-000000000001");
        private Guid _listId2 = Guid.Parse("10000000-0000-0000-0000-000000000005");
        
        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _geolistRepo = _services.GetRequiredService<IRepository<GeoList>>();
            _publicGeolistRepo = _services.GetRequiredService<IRepository<PublicList>>();
            _gpUserRepo = _services.GetRequiredService<IRepository<GeoPingUser>>();
            _securitySrv = _services.GetRequiredService<ISecurityService>();

            _sut = new GeolistService(_geolistRepo, _publicGeolistRepo, _gpUserRepo, _securitySrv);
        }


        [Test]
        public void Should_add_new_lists()
        {
            var expectedListId = Guid.Parse("10000000-0000-0000-0000-000000000005");

            var testList = new GeoList
            {
                Id = expectedListId,
                Created = DateTime.UtcNow,
                Name = "Test",
                OwnerId = _expectedUserId1,
                IsPublic = true
            };

            _sut.Add(testList);

            var testData1 = _geolistRepo.Data.FirstOrDefault(x => x.Id == expectedListId);

            Assert.That(testData1 != null); 
            Assert.That(testData1.OwnerId == _expectedUserId1);
            Assert.That(testData1.Created != null);

            var testData2 = _publicGeolistRepo.Data.FirstOrDefault(x => x.ListId == expectedListId);

            Assert.That(testData2 != null);
        }
        
        [Test]
        public void Should_get_user_list()
        {
            var result = _sut.GetByFilter(_expectedUserId1, new UsersGeolistFilterDTO(), out int totalItems);

            Assert.That(result.Success);
            Assert.AreEqual(3, result.Data.Count());
            Assert.AreEqual(3, totalItems);
            Assert.AreEqual(3, result.Data.Where(x => x.OwnerId == _expectedUserId1).Count());
        }
        
        [Test]
        public void Should_get_public_lists()
        {
            var result = _sut.GetByFilter(new PublicGeolistFilterDTO(), out int totalItems);
            Assert.That(result.Success);
            Assert.AreEqual(2, result.Data.Count());
            Assert.AreEqual(2, totalItems);
            Assert.AreEqual(1, result.Data.Where(x => x.OwnerId == _expectedUserId1).Count());
        }
        
        [Test]
        public void Should_get_public_users_lists()
        {
            var result = _sut.GetByFilter(_expectedUserId1, new PublicGeolistFilterDTO(), out int totalItems);
            Assert.That(result.Success);
            Assert.AreEqual(1, result.Data.Count());
            Assert.AreEqual(1, totalItems);
            Assert.AreEqual(0, result.Data.Where(x => x.OwnerId == _expectedUserId2).Count());
        }

        [Test]
        public void Should_remove_a_list()
        {
            var expectedListId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var testList = _sut.Get(x => x.Id == expectedListId).FirstOrDefault();

            var testTry1 = _sut.Delete(_expectedUserId2, testList);
            Assert.That(!testTry1.Success);

            var testTry2 = _sut.Delete(_expectedUserId1, testList);
            Assert.That(testTry2.Success);

            var data = _geolistRepo.Data.Where(x => x.Id == _listId1).FirstOrDefault();

            Assert.That(data == null);
        }
    }
}
