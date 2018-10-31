using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Data;
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
        private ISecurityService _securitySrv;

        private Guid _listId1 = Guid.Parse("10000000-0000-0000-0000-000000000001");
        private Guid _listId2 = Guid.Parse("10000000-0000-0000-0000-000000000005");
        private Guid _gpUserId1 = Guid.Parse("10000000-0000-0000-0000-000000000001");
        private Guid _gpUserId2 = Guid.Parse("10000000-0000-0000-0000-000000000002");
        private TestLists _testLists = new TestLists();
        /*private GeoList _editList = new GeoList()
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000005"),
            Name = "edited",
            OwnerId = Guid.Parse("10000000-0000-0000-0000-000000000002")
        };*/


        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _geolistRepo = _services.GetRequiredService<IRepository<GeoList>>();
            _publicGeolistRepo = _services.GetRequiredService<IRepository<PublicList>>();
            _gpUserRepo = _services.GetRequiredService<IRepository<GeoPingUser>>();
            _securitySrv = _services.GetRequiredService<ISecurityService>();

            sut = new GeolistService(_geolistRepo, _publicGeolistRepo, _gpUserRepo, _securitySrv);
        }


        [Test]
        public void Should_add_new_lists()
        {
            foreach (var list in _testLists.GetGeolists())
            {
                var result = sut.Add(list);

                Assert.That(result.Success);
                Assert.That(result.Data != null);
            }

            var data = _geolistRepo.Data.Where(x => x.Id == _listId1).FirstOrDefault();

            Assert.That(data != null); 
            Assert.That(data.OwnerId == _gpUserId1);
            Assert.That(data.Created != null);
        }
        
        [Test]
        public void Should_get_user_list()
        {
            foreach (var list in _testLists.GetGeolists())
            {
                sut.Add(list);
            }

            var result = sut.GetByFilter(_gpUserId1, new UsersGeolistFilterDTO(), out int totalItems);
            Assert.That(result.Success);
            Assert.AreEqual(3, result.Data.Count());
            Assert.AreEqual(3, totalItems);
            Assert.AreEqual(3, result.Data.Where(x => x.OwnerId == _gpUserId1).Count());
        }
        
        [Test]
        public void Should_get_public_lists()
        {
            foreach (var list in _testLists.GetGeolists())
            {
                sut.Add(list);
            }

            var result = sut.GetByFilter(new PublicGeolistFilterDTO(), out int totalItems);
            Assert.That(result.Success);
            Assert.AreEqual(2, result.Data.Count());
            Assert.AreEqual(2, totalItems);
            Assert.AreEqual(1, result.Data.Where(x => x.OwnerId == _gpUserId1).Count());
        }
        
        [Test]
        public void Should_get_public_users_lists()
        {
            foreach (var list in _testLists.GetGeolists())
            {
                sut.Add(list);
            }

            var result = sut.GetByFilter(_gpUserId1, new PublicGeolistFilterDTO(), out int totalItems);
            Assert.That(result.Success);
            Assert.AreEqual(1, result.Data.Count());
            Assert.AreEqual(1, totalItems);
            Assert.AreEqual(0, result.Data.Where(x => x.OwnerId == _gpUserId2).Count());
        }
        /*
        [Test]
        public void Should_edit_a_list()
        {
            var result = sut.Update(_editList);

            Assert.That(result.Success);

            var data = _geolistRepo.Data.Where(x => x.Id == _listId2).FirstOrDefault();

            Assert.That(data != null);
            Assert.That(_editList.Name, Is.EqualTo(data.Name));
        }
        */
        [Test]
        public void Should_remove_a_list()
        {
            foreach (var list in _testLists.GetGeolists())
            {
                sut.Add(list);
            }

            var testList = sut.Get(x => x.Id == _listId1).FirstOrDefault();

            var result = sut.Delete(_gpUserId1, testList);

            Assert.That(result.Success);

            var data = _geolistRepo.Data.Where(x => x.Id == _listId1).FirstOrDefault();

            Assert.That(data == null);
        }
    }
}
