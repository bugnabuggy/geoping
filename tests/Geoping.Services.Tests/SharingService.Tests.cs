using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Infrastructure.Repositories;
using GeoPing.TestData.Helpers;
using GeoPing.Utilities.EmailSender;
using GeoPing.Utilities.EmailSender.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace GeoPing.Services.Tests
{
    [TestFixture]
    public class SharingServiceTests
    {
        private IRepository<ListSharing> _sharingRepo;
        private IRepository<GeoList> _listRepo;
        private ISecurityService _securitySrv;
        private IGeolistService _listSrv;
        private IGeopingUserService _gpUserSrv;
        private UserManager<AppIdentityUser> _userManager;
        private Mock<IGeopingTokenService> _mockTokenSrv;
        private IValidationService _validator;
        private Mock<IEmailService> _mockEmailSvc;
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
        public async Task BeforeEachAsync()
        {
            _services = await new DataBaseDiBootstrapperInMemory().GetServiceProviderWithSeedDb();

            _sharingRepo = _services.GetRequiredService<IRepository<ListSharing>>();
            _listRepo = _services.GetRequiredService<IRepository<GeoList>>();
            _securitySrv = _services.GetRequiredService<ISecurityService>();
            _listSrv = _services.GetRequiredService<IGeolistService>();
            _gpUserSrv = _services.GetRequiredService<IGeopingUserService>();
            _userManager = _services.GetRequiredService<UserManager<AppIdentityUser>>();
            _mockTokenSrv = new Mock<IGeopingTokenService>();
            _validator = _services.GetRequiredService<IValidationService>();
            _mockEmailSvc = new Mock<IEmailService>();
            _mockSettings = new Mock<IOptions<ApplicationSettings>>();


            _mockTokenSrv
                .Setup(x => x.CreateSharingInviteToken(It.IsAny<string>()))
                .Returns(new GeoPingToken());
            _mockTokenSrv
                .Setup(x => x.CreateSharingToken(It.IsAny<string>()))
                .Returns(new GeoPingToken());

            _mockEmailSvc
                .Setup(x => x.Send(It.IsAny<EmailMessage>()))
                .Verifiable();
            _mockEmailSvc
                .Setup(x => x.GetConfirmationMail(It.IsAny<string>(), It.IsAny<string>()))
                .Returns("");


            _mockSettings
                .Setup(x => x.Value)
                .Returns(new ApplicationSettings
                {
                    AutoComplete = new AutoCompleteSettings
                    {
                        MinCharsToAutoComplete = 3,
                        SizeOfAutoCompletedList = 10
                    },
                    Urls = new UrlsSettings
                    {
                        ActionsUrl = new ActionsUrlSettings()
                    },
                    EmailSender = new EmailSenderSettings()
                });

            _sut = new SharingService
                (_sharingRepo,
                _listRepo,
                _securitySrv,
                _listSrv,
                _mockTokenSrv.Object,
                _gpUserSrv,
                _userManager,
                _validator,
                _mockEmailSvc.Object,
                _mockSettings.Object);
        }

        //[Test]
        //public void Should_return_autocompleted_users_list()
        //{
        //    string query;
        //    IEnumerable<UserAutoCompleteDTO> data;

        //    query = "te";
        //    data = _sut.GetAutoCompletedUsersList(query);
        //    Assert.AreEqual(null, data);

        //    query = "test";
        //    data = _sut.GetAutoCompletedUsersList(query);
        //    Assert.AreEqual(4, data.Count());

        //    query = "testuser";
        //    data = _sut.GetAutoCompletedUsersList(query);
        //    Assert.AreEqual(2, data.Count());

        //    query = "TestUser@test.com";
        //    data = _sut.GetAutoCompletedUsersList(query);
        //    Assert.AreEqual(1, data.Count());
        //}

        [Test]
        public async Task Shouldnt_invite_user_because_list_doesnt_exist()
        {
            var usersData = new[]
            {
                "TestUser@test.com"
            };

            var sharingsBefore = _sharingRepo.Data.Count();

            // List shouldn`t exist
            var data = await _sut.InviteUsersByList(_userId2, _listId2, usersData);

            var sharingsAfter = _sharingRepo.Data.Count();

            Assert.AreEqual(false, data.Success);
            Assert.AreEqual(sharingsBefore, sharingsAfter);
        }


        [Test]
        public async Task Shouldnt_invite_user_because_he_isnt_allowed_to_do_this()
        {
            var usersData = new[]
            {
                "TestUser@test.com"
            };

            OperationResult<IEnumerable<UserListWasSharedWithDTO>> data;

            var sharingsBefore = _sharingRepo.Data.Count();

            // User isn`t allowed to list
            data = await _sut.InviteUsersByList(_userId2, _listId1, usersData);

            var sharingsAfter = _sharingRepo.Data.Count();

            Assert.AreEqual(false, data.Success);
            Assert.AreEqual(sharingsBefore, sharingsAfter);
        }

        [Test]
        public async Task Shouldnt_invite_user_because_he_tries_invite_himself()
        {
            var usersData = new[]
            {
                "TestUser@test.com"
            };

            OperationResult<IEnumerable<UserListWasSharedWithDTO>> data;

            var sharingsBefore = _sharingRepo.Data.Count();

            // User tries invite himself
            data = await _sut.InviteUsersByList(_userId1, _listId1, usersData);

            var sharingsAfter = _sharingRepo.Data.Count();

            Assert.AreEqual(false, data.Success);
            Assert.AreEqual(sharingsBefore, sharingsAfter);
        }

        [Test]
        public async Task Should_invite_users_to_list()
        {
            var usersData = new[]
            {
                "nonexistentuser",
                "not.valid@.email",
                "Tester",
                "valid@email.com"
            };

            OperationResult<IEnumerable<UserListWasSharedWithDTO>> data;

            var sharingsBefore = _sharingRepo.Data.Count();

            data = await _sut.InviteUsersByList(_userId1, _listId1, usersData);

            var sharingsAfter = _sharingRepo.Data.Count();

            Assert.AreEqual(true, data.Success);
            //Assert.AreEqual(2, data.Data.Count());
            Assert.AreEqual(4, data.Messages.Count());

            Assert.AreEqual(sharingsBefore, sharingsAfter - 2);
            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Email == "valid@email.com").Status == "invited");
            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Email == "tester@test.com").Status == "pending");
        }

        [Test]
        public void Shouldnt_accept_invite_by_user_because_sharing_doesnt_exist()
        {
            // Cause of sharing doesn`t exist
            var data = _sut.AcceptSharing(_userId2, _sharingId5);

            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(_sharingId5)) == null);
            Assert.AreEqual(false, data.Success);
        }

        [Test]
        public void Shouldnt_accept_invite_by_user_because_user_isnt_allowed()
        {
            // Cause of user has no access
            var data = _sut.AcceptSharing(_userId1, _sharingId2);

            Assert.AreEqual(false, data.Success);
            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(_sharingId2)).Status != "accepted");
        }

        [Test]
        public void Should_accept_invite_by_user()
        {
            var data = _sut.AcceptSharing(_userId2, _sharingId2);

            Assert.AreEqual(true, data.Success);
            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(_sharingId2)).Status == "accepted");
        }

        [Test]
        public void Shouldnt_decline_invite_or_refuse_sharing_by_user_because_sharing_doesnt_exist()
        {
            // Cause of sharing doesn`t exist
            var data = _sut.RefuseSharing(_userId2, _sharingId5);

            Assert.AreEqual(false, data.Success);
            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(_sharingId5)) == null);
        }

        [Test]
        public void Shouldnt_decline_invite_or_refuse_sharing_by_user_because_user_isnt_allowed()
        {
            // Cause of user has no access
            var data = _sut.RefuseSharing(_userId2, _sharingId1);

            Assert.AreEqual(false, data.Success);
            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(_sharingId1)) != null);
        }

        [Test]
        public void Should_decline_invite_or_refuse_sharing_by_user()
        {
            var data = _sut.RefuseSharing(_userId2, _sharingId2);

            Assert.AreEqual(true, data.Success);
            Assert.That(_sharingRepo.Get().FirstOrDefault(x => x.Id == Guid.Parse(_sharingId2)) == null);
        }

        // There is no sence to check if user has no access cause of method is used inside another services` methods
        [Test]
        public void Should_confirm_sharing_by_user_with_registration()
        {
            Assert.AreEqual(null, _sharingRepo.Get(x => x.Id == Guid.Parse(_sharingId3)).FirstOrDefault().UserId);

            _sut.ConfirmSharingWithRegistration(_sharingId3, _userId1, "test1@test.com");

            Assert.AreEqual(_userId1, _sharingRepo.Get(x => x.Id == Guid.Parse(_sharingId3)).FirstOrDefault().UserId);
        }

        [Test]
        public void Should_get_lists_shared_with_user()
        {
            var data = _sut.GetListsSharedWith(_userId1);

            Assert.AreEqual(2, data.Count());
        }

        [Test]
        public void Should_get_lists_shared_with_user_having_status_pending()
        {
            var data = _sut.GetListsSharedWith(_userId1, "pending");

            Assert.AreEqual(1, data.Count());
            Assert.That(!data.Any(x => x.ShareStatus == "accepted"));
        }

        [Test]
        public void Should_get_lists_shared_with_user_having_status_accepted()
        {
            var data = _sut.GetListsSharedWith(_userId1, "accepted");

            Assert.AreEqual(1, data.Count());
            Assert.That(!data.Any(x => x.ShareStatus == "pending"));
        }

        //[Test]
        //public void Should_get_lists_shared_by_user()
        //{
        //    var data = _sut.GetListsSharedBy(_userId1);

        //    Assert.AreEqual(1, data.Count());
        //    Assert.AreEqual(true, data.Any(x => x.ShareId == Guid.Parse(_sharingId4)));
        //}

        [Test]
        public void Should_revoke_sharing_by_user()
        {
            Assert.AreEqual(true, _sharingRepo.Get().Any(x => x.Id == Guid.Parse(_sharingId4)));

            var data = _sut.RevokeSharing(_userId1, _sharingId4);

            Assert.AreEqual(true, data.Success);
            Assert.AreEqual(false, _sharingRepo.Get().Any(x => x.Id == Guid.Parse(_sharingId4)));
        }
    }
}
