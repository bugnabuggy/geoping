﻿using GeoPing.Core.Entities;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Data;
using GeoPing.TestData.Helpers;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class GeopointServiceTests
    {
        private IServiceProvider _services;
        private IGeopointService sut;

        private IRepository<GeoPoint> _geopointRepo;
        private readonly TestPoints _testPoints = new TestPoints();

        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _geopointRepo = _services.GetRequiredService<IRepository<GeoPoint>>();

            sut = new GeopointService(_geopointRepo);
        }
        
        [Test]
        public void Should_add_new_points()
        {
            foreach (var point in _testPoints.GetGeopoints())
            {
                var result = sut.Add(point);

                Assert.That(result.Success);
                Assert.That(result.Data != null);
                var data = _geopointRepo.Data.Where(x => x.Id == point.Id).FirstOrDefault();
                Assert.That(data != null);
            }
        }

        [Test]
        public void Should_get_points()
        {
            foreach (var point in _testPoints.GetGeopoints())
            {
                sut.Add(point);

                var data1 = sut.Get(x => x.Id == point.Id);
                Assert.That(data1 != null);
            }

            var expectedListId = Guid.Parse("00000000-0000-0000-0000-000000000001");

            var data2 = sut.GetByFilter(expectedListId, new GeopointFilterDTO(), out int totalItems1);

            Assert.That(data2.Data != null);
            Assert.That(3, Is.EqualTo(totalItems1));

            var data3 = sut.GetByFilter(expectedListId, new GeopointFilterDTO(){ NameContains = "Not" }, out int totalItems2);

            Assert.That(data2.Data != null);
            Assert.That(1, Is.EqualTo(totalItems2));
        }

        [Test]
        public void Should_remove_a_point()
        {
            foreach (var point in _testPoints.GetGeopoints())
            {
                sut.Add(point);
            }

            var expectedPointId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var testPoint = sut.Get(x => x.Id == expectedPointId).FirstOrDefault();

            var result = sut.Delete(testPoint);

            Assert.That(result.Success);

            var data = _geopointRepo.Data.Where(x => x.Id == expectedPointId).FirstOrDefault();

            Assert.That(data == null);
        }

        [Test]
        public void Should_remove_points()
        {
            foreach (var point in _testPoints.GetGeopoints())
            {
                sut.Add(point);
            }

            var expectedPointId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var pointIds = "&#," + "10000000-0000-0000-0000-000000000001," + "446131617979416," + 
                           "10000000-0000-0000-0000-000000000005," + "10000000-0000-0000-0000-000000000004,";

            var result = sut.Delete(pointIds);

            Assert.That(result.Success);

            var data = _geopointRepo.Data.Where(x => x.Id == expectedPointId).FirstOrDefault();

            Assert.That(data == null);
        }
    }
}