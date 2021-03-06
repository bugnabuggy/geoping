﻿using System;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    class AccountServiceTests
    {
        private IServiceProvider _services;
        private IAccountService _accountSrv;
        private UserManager<AppIdentityUser> _userManager;
        private ILogger<AccountService> _logger;
        private IGeopingUserService _gpUserSrv;
        private IRepository<GeoPingUser> _gpUserRepo;
        private IGeopingTokenService _tokenSrv;
        private ISharingService _sharingSrv;
        private IEmailService _emailSrv;
        private IOptions<ApplicationSettings> _settings;

        private string _identityId;
        private Guid _gpUserId;

        [SetUp]
        public async Task BeforeEachAsync()
        {
            _services = await new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();
            _userManager = _services.GetRequiredService<UserManager<AppIdentityUser>>();
            _logger = _services.GetRequiredService<ILogger<AccountService>>();
            _gpUserSrv = _services.GetRequiredService<IGeopingUserService>();
            _gpUserRepo = _services.GetRequiredService<IRepository<GeoPingUser>>();
            _tokenSrv = _services.GetRequiredService<IGeopingTokenService>();
            _sharingSrv = _services.GetRequiredService<ISharingService>();
            _emailSrv = new Mock<IEmailService>().Object;
            _settings = new Mock<IOptions<ApplicationSettings>>().Object;

            _accountSrv = new AccountService
                (_userManager,
                _logger,
                _gpUserSrv,
                _tokenSrv,
                _sharingSrv,
                _emailSrv,
                _settings);

            _identityId = _userManager.FindByNameAsync("testadmin").Result.Id;
            _gpUserId = _gpUserRepo.Data.FirstOrDefault(x => x.IdentityId == _identityId).Id;
        }

        [Test]
        public void Should_get_profile_info_of_testadmin()
        {
            var profile = _accountSrv.GetProfile(_gpUserId).Data;

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
