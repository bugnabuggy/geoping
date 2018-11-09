using Geoping.Services;
using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class CheckInServiceTests
    {
        private IServiceProvider _services;
        private ICheckInService sut;

        private IRepository<CheckIn> _checkInRepo;
        private IGeolistService _listSrv;
        private IGeopointService _pointSrv;
        private Guid _expectedUserId = Guid.Parse("10000000-0000-0000-0000-000000000002");

        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();
            _listSrv = _services.GetRequiredService<IGeolistService>();
            _pointSrv = _services.GetRequiredService<IGeopointService>();
            _checkInRepo = _services.GetRequiredService<IRepository<CheckIn>>();
            sut = new CheckInService(_listSrv, _pointSrv, _checkInRepo);
        }

        [Test]
        public void Should_check_in_point()
        {
            var expectedItemId = Guid.Parse("00000000-0000-0000-0000-000000000005");

            var testItem = new CheckIn()
            {
                Id = expectedItemId,
                PointId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Date = DateTime.UtcNow,
                UserId = _expectedUserId
            };
            sut.AddCheckIn(testItem);

            var data = _checkInRepo.Data.FirstOrDefault(x => x.Id == expectedItemId);

            Assert.That(data != null);
        }

        [Test]
        public void Should_get_checkIn_for_point()
        {
            var expectedItemId = Guid.Parse("10000000-0000-0000-0000-000000000002");
            var expectedPointId = "10000000-0000-0000-0000-000000000001";

            var data = sut.GetCheckIn(expectedPointId, _expectedUserId);

            Assert.That(data.Success);
            Assert.That(data.Data != null);
            Assert.That(expectedItemId, Is.EqualTo(data.Data.Id));
        }

        [Test]
        public void Should_get_checkIn_for_point_of_list()
        {
            var expectedItemId = Guid.Parse("10000000-0000-0000-0000-000000000002");
            var expectedListId = "10000000-0000-0000-0000-000000000001";

            var data = sut.GetChecksIn(expectedListId, _expectedUserId);

            Assert.That(data.Success);
            Assert.That(data.Data != null);
            Assert.That(2, Is.EqualTo(data.Data.Count()));
        }
    }
}
