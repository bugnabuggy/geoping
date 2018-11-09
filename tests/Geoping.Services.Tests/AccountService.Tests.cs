using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    class AccountServiceTests
    {
        private IServiceProvider _services;
        private IAccountService _accountSrv;
        private UserManager<AppIdentityUser> _userManager;
        private ILogger<AccountService> _logger;
        private IGPUserService _gpUserSrv;
        private IRepository<GeoPingUser> _gpUserRepo;

        private string _identityId;
        private Guid _gpUserId;

        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();
            _userManager = _services.GetRequiredService<UserManager<AppIdentityUser>>();
            _logger = _services.GetRequiredService<ILogger<AccountService>>();
            _gpUserSrv = _services.GetRequiredService<IGPUserService>();
            _gpUserRepo = _services.GetRequiredService<IRepository<GeoPingUser>>();
            _accountSrv = new AccountService(_userManager,
                                             _logger,
                                             _gpUserSrv);

            _identityId = _userManager.FindByNameAsync("testadmin").Result.Id;
            _gpUserId = _gpUserRepo.Data.FirstOrDefault(x => x.IdentityId == _identityId).Id;
        }

        [Test]
        public void Should_get_profile_info_of_testadmin()
        {
            var profile = (GeoPingUser)_accountSrv.GetProfile(_gpUserId).Data;

            Assert.IsTrue(profile != null);
            Assert.AreEqual("testadmin", profile.Login);
            Assert.AreEqual("testadmin@geoping.com", profile.Email);
            Assert.AreEqual("premium", profile.AccountType);
        }

        //[Test]
        //public void Should_edit_profile_info_of_testadmin()
        //{
        //    var editedProfile = (GeoPingUser)_accountSrv.GetProfile(_gpUserId).Data;

        //    editedProfile.FirstName = "Test";
        //    editedProfile.LastName = "Admin";
        //    editedProfile.Birthday = new DateTime(2018, 01, 15);
        //    editedProfile.AccountType = "superpremium";

        //    var profile = (GeoPingUser)_accountSrv.EditProfile(_gpUserId, editedProfile).Data;

        //    Assert.IsTrue(profile != null);
        //    Assert.AreEqual("testadmin", profile.Login);
        //    Assert.AreEqual("testadmin@geoping.com", profile.Email);
        //    Assert.AreEqual("superpremium", profile.AccountType);
        //    Assert.AreEqual("Test", profile.FirstName);
        //    Assert.AreEqual("Admin", profile.LastName);
        //    Assert.AreEqual("15.01.2018", profile.Birthday.ToShortDateString());
        //}
    }
}
