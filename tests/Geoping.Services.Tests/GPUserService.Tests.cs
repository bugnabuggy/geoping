using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class GPUserServiceTests
    {
        private IRepository<GeoPingUser> _gpUserRepo;
        private Mock<IOptions<ApplicationSettings>> _settings;

        private IGeopingUserService _sut;

        private IServiceProvider _services;

        [SetUp]
        public async Task BeforeEachAsync()
        {
            _services = await new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _gpUserRepo = _services.GetRequiredService<IRepository<GeoPingUser>>();

            _settings = new Mock<IOptions<ApplicationSettings>>();
            _settings
                .Setup(x => x.Value)
                .Returns(new ApplicationSettings()
                {
                    AutoComplete = new AutoCompleteSettings()
                    {
                        MinCharsToAutoComplete = 3,
                        SizeOfAutoCompletedList = 10
                    }
                });

            _sut = new GeopingUserService(_gpUserRepo, _settings.Object);
        }

        [Test]
        public void Should_return_list_of_users_with_short_info()
        {
            IEnumerable<UserAutoCompleteDTO> data;
            string testQuery;

            Assert.That(_gpUserRepo.Get() != null);

            testQuery = "te";
            data = _sut.GetUsersShortInfoList(testQuery);

            Assert.That(data == null);

            testQuery = "test";
            data = _sut.GetUsersShortInfoList(testQuery);

            Assert.AreEqual(4, data.Count());
            Assert.That(data.Any(x => x.Email.Contains(testQuery) ||
                                      x.UserName.Contains(testQuery)));

            testQuery = "tester@test.com";
            data = _sut.GetUsersShortInfoList(testQuery);

            Assert.AreEqual(1, data.Count());
            Assert.That(data.Any(x => x.Email.Contains(testQuery) ||
                                      x.UserName.Contains(testQuery)));
            Assert.That(!string.IsNullOrEmpty(data.FirstOrDefault(x => x.Email == testQuery).FullName));
        }
    }
}
