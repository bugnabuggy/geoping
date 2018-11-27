using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    class SharingServiceTests
    {
        private IRepository<ListSharing> _shareRepo;
        private IRepository<GeoList> _listRepo;
        private ISecurityService _securitySrv;
        private IGeolistService _listSrv;
        private IGeopingTokenService _tokenSrv;
        private IGPUserService _gpUserSrv;
        private UserManager<AppIdentityUser> _userManager;
        private IValidationService _validator;
        private IEmailService _emailSvc;
        private Mock<IOptions<ApplicationSettings>> _mockSettings;

        private IServiceProvider _services;
        private ISharingService _sut;

        private Guid _userId1 = Guid.Parse("10000000-0000-0000-0000-000000000001");
        private Guid _userId2 = Guid.Parse("10000000-0000-0000-0000-000000000002");

        private string _listId1 = "10000000-0000-0000-0000-000000000001";
        private string _listId2 = "10000000-0000-0000-0000-000000000005";

        private string _sharingId1 = "10000000-0000-0000-0000-000000000001";
        private string _sharingId2 = "10000000-0000-0000-0000-000000000002";
        private string _sharingId3 = "10000000-0000-0000-0000-000000000003";
        private string _sharingId4 = "10000000-0000-0000-0000-000000000004";
        private string _sharingId5 = "10000000-0000-0000-0000-000000000005";

        [SetUp]
        public void BeforeEach()
        {
            _services = new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _shareRepo = _services.GetRequiredService<IRepository<ListSharing>>();
            _listRepo = _services.GetRequiredService<IRepository<GeoList>>();
            _securitySrv = _services.GetRequiredService<ISecurityService>();
            _listSrv = _services.GetRequiredService<IGeolistService>();
            _tokenSrv = new Mock<IGeopingTokenService>().Object;
            _gpUserSrv = _services.GetRequiredService<IGPUserService>();
            _userManager = _services.GetRequiredService<UserManager<AppIdentityUser>>();
            _validator = new Mock<IValidationService>().Object;
            _emailSvc = new Mock<IEmailService>().Object;

            _mockSettings
                .Setup(x => x.Value)
                .Returns(new ApplicationSettings()
                {
                    AutoComplete = new AutoCompleteSettings()
                    {
                        MinCharsToAutoComplete = 3,
                        SizeOfAutoCompletedList = 10
                    }
                });

            _sut = new SharingService
                (_shareRepo,
                _listRepo,
                _securitySrv,
                _listSrv,
                _tokenSrv,
                _gpUserSrv,
                _userManager,
                _validator,
                _emailSvc,
                _mockSettings.Object);
        }

        [Test]
        public void Should_return_autocompleted_users_list()
        {
            string query;
            IEnumerable<UserAutoCompleteDTO> data;

            query = "te";
            data = _sut.GetAutoCompletedUsersList(query);
            Assert.AreEqual(null, data);

            query = "test";
            data = _sut.GetAutoCompletedUsersList(query);
            Assert.AreEqual(2, data.Count());

            query = "testad";
            data = _sut.GetAutoCompletedUsersList(query);
            Assert.AreEqual(1, data.Count());
        }

        [Test]
        public void Should_invite_no_one_user_by_list()
        {
            var usersData = new[]
            {
                "nonexistentuser",
                "not.valid.email",
                "users@email.com"
            };

            OperationResult data;

            // List shouldn`t exist
            data = _sut.InviteUsersByList(_userId2, _listId2, usersData).Result;
            Assert.AreEqual(false, data.Success);

            // User isn`t allowed to list
            data = _sut.InviteUsersByList(_userId2, _listId1, usersData).Result;
            Assert.AreEqual(false, data.Success);
        }

        [Test]
        public void Should_invite_users_to_list()
        {
            var usersData = new List<string>
            {
                "nonexistentuser",
                "not.valid.email",
                "testuser",
                "valid@email.com"
            };

            OperationResult data;

            // List shouldn`t exist
            data = _sut.InviteUsersByList(_userId1, _listId1, usersData.ToArray()).Result;
            Assert.AreEqual(true, data.Success);
            Assert.AreEqual(2, ((string[])data.Data).Count());
            Assert.AreEqual(4, data.Messages.Count());
        }

        [Test]
        public void Should_user_accept_invite()
        {
            OperationResult data;

            data = _sut.AcceptSharing(_userId2, _sharingId2);
            Assert.AreEqual(true, data.Success);
        }

        [Test]
        public void Shouldnt_user_accept_invite()
        {
            OperationResult data;

            // Cause of sharing doesn`t exist
            data = _sut.AcceptSharing(_userId2, _sharingId5);
            Assert.AreEqual(false, data.Success);

            // Cause of user has no access
            data = _sut.AcceptSharing(_userId2, _sharingId1);
            Assert.AreEqual(false, data.Success);
        }

        [Test]
        public void Should_user_decline_invite_and_refuse_sharing()
        {
            OperationResult data;

            data = _sut.RefuseSharing(_userId2, _sharingId2);
            Assert.AreEqual(true, data.Success);
        }

        [Test]
        public void Shouldnt_user_decline_invite_and_refuse_sharing()
        {
            OperationResult data;

            // Cause of sharing doesn`t exist
            data = _sut.RefuseSharing(_userId2, _sharingId5);
            Assert.AreEqual(false, data.Success);

            // Cause of user has no access
            data = _sut.RefuseSharing(_userId2, _sharingId1);
            Assert.AreEqual(false, data.Success);
        }

        // There is no sence to check if user has no access cause of method is used inside another services` methods
        [Test]
        public void Should_user_confirm_sharing_with_registration()
        {
            Assert.AreEqual(null, _shareRepo.Get(x => x.Id == Guid.Parse(_sharingId3)).FirstOrDefault());

            _sut.ConfirmSharingWithRegistration(_sharingId3, _userId1, "test1@test.com");

            Assert.AreEqual(_userId1, _shareRepo.Get(x => x.Id == Guid.Parse(_sharingId3)).FirstOrDefault());
        }

        [Test]
        public void Should_user_get_lists_shared_with_him()
        {
            IEnumerable<SharedListInfoDTO> data;

            data = _sut.GetListsSharedWith(_userId1);

            Assert.AreEqual(3, data.Count());
        }

        [Test]
        public void Should_user_get_lists_shared_by_him()
        {
            IEnumerable<SharedListInfoDTO> data;

            data = _sut.GetListsSharedBy(_userId1);

            Assert.AreEqual(1, data.Count());
            Assert.AreEqual(_userId2, data.Any(x => x.ShareId == Guid.Parse(_sharingId4)));
        }

        [Test]
        public void Should_user_revoke_his_sharing()
        {
            OperationResult data;

            data = _sut.RevokeSharing(_userId1, _sharingId4);

            Assert.AreEqual(true, data.Success);
            Assert.AreEqual(false, _shareRepo.Get().Any(x => x.Id == Guid.Parse(_sharingId4)));
        }
    }
}
