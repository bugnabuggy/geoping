using System;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Data;
using GeoPing.TestData.Helpers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class GeopointServiceTests
    {
        private IServiceProvider _services;
        private Mock<ILogger<GeopointService>> _mockLogger;

        private IGeopointService _sut;

        private IRepository<GeoPoint> _geopointRepo;
        private readonly TestPoints _testPoints = new TestPoints();

        [SetUp]
        public async Task BeforeEach()
        {
            _services = await new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _geopointRepo = _services.GetRequiredService<IRepository<GeoPoint>>();
            _mockLogger = new Mock<ILogger<GeopointService>>();

            _sut = new GeopointService(_geopointRepo, _mockLogger.Object);
        }
        
        [Test]
        public void Should_add_new_points()
        {
            var expectedPointId = Guid.Parse("10000000-0000-0000-0000-000000000005");
            var expectedListId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var testPoint = new GeoPoint
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

            var testData2 = _sut.GetByFilter(expectedListId, new GeopointFilterDTO { Name = "Not" }, out int totalItems2);

            Assert.That(testData2.Data != null);
            Assert.That(1, Is.EqualTo(totalItems2));
        }

        [Test]
        public void Should_remove_a_point()
        {
            var expectedPointId = Guid.Parse("10000000-0000-0000-0000-000000000001");

            var testPoint = _geopointRepo.Data.FirstOrDefault(x => x.Id == expectedPointId);

            var result = _sut.Delete(testPoint);

            Assert.That(result.Success);

            var data = _geopointRepo.Data.FirstOrDefault(x => x.Id == expectedPointId);

            Assert.That(data == null);
        }

        [Test]
        public void Should_remove_points()
        {
            const string expectedPointId = "10000000-0000-0000-0000-000000000001";

            var pointIds = "&#," + expectedPointId + "," + "446131617979416," + 
                           "10000000-0000-0000-0000-000000000005," + "10000000-0000-0000-0000-000000000004,";

            var result = _sut.Delete(pointIds);

            Assert.That(result.Success);

            var data = _geopointRepo.Data.FirstOrDefault(x => x.Id == Guid.Parse(expectedPointId));

            Assert.That(data == null);
        }
    }
}
