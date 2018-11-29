using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Data;
using GeoPing.TestData.Helpers;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Linq;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class GeopointServiceTests
    {
        private IServiceProvider _services;
        private IGeopointService _sut;

        private IRepository<GeoPoint> _geopointRepo;
        private readonly TestPoints _testPoints = new TestPoints();

        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _geopointRepo = _services.GetRequiredService<IRepository<GeoPoint>>();

            _sut = new GeopointService(_geopointRepo);
        }
        
        [Test]
        public void Should_add_new_points()
        {
            var expectedPointId = Guid.Parse("10000000-0000-0000-0000-000000000005");
            var expectedListId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var testPoint = new GeoPoint()
            {
                Id = expectedPointId,
                Name = "Test",
                Latitude = 55,
                Longitude = 55,
                ListId = expectedListId
            };

            var result = _sut.Add(testPoint);

            Assert.That(result.Success);
            Assert.That(result.Data != null);

            var testData = _geopointRepo.Data.FirstOrDefault(x => x.Id == expectedPointId);

            Assert.That(testData != null);
            Assert.That(testData.ListId == expectedListId);
        }

        [Test]
        public void Should_get_points()
        {
            var expectedListId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var testData1 = _sut.GetByFilter(expectedListId, new GeopointFilterDTO(), out int totalItems1);

            Assert.That(testData1.Data != null);
            Assert.That(3, Is.EqualTo(totalItems1));

            var testData2 = _sut.GetByFilter(expectedListId, new GeopointFilterDTO(){ Name = "Not" }, out int totalItems2);

            Assert.That(testData2.Data != null);
            Assert.That(1, Is.EqualTo(totalItems2));
        }

        [Test]
        public void Should_remove_a_point()
        {
            var expectedPointId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var testPoint = _sut.Get(x => x.Id == expectedPointId).FirstOrDefault();

            var result = _sut.Delete(testPoint);

            Assert.That(result.Success);

            var data = _geopointRepo.Data.Where(x => x.Id == expectedPointId).FirstOrDefault();

            Assert.That(data == null);
        }

        [Test]
        public void Should_remove_points()
        {
            var expectedPointId = "10000000-0000-0000-0000-000000000001";

            var pointIds = "&#," + expectedPointId + "," + "446131617979416," + 
                           "10000000-0000-0000-0000-000000000005," + "10000000-0000-0000-0000-000000000004,";

            var result = _sut.Delete(pointIds);

            Assert.That(result.Success);

            var data = _geopointRepo.Data.Where(x => x.Id == Guid.Parse(expectedPointId)).FirstOrDefault();

            Assert.That(data == null);
        }
    }
}
