using GeoPing.Api.Interfaces;
using GeoPing.Core.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Models;
using GeoPing.Utilities.EmailSender;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoPing.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/geolist/{listId}/sharing")]
    [Authorize]
    public class SharingController : Controller
    {
        private ISharingService _shareSrv;
        private IClaimsHelper _helper;
        private IEmailService _emailSvc;

        public SharingController(ISharingService shareSrv,
                                 IClaimsHelper helper,
                                 IEmailService emailSvc)
        {
            _shareSrv = shareSrv;
            _helper = helper;
            _emailSvc = emailSvc;
        }

        [HttpGet]
        [Route("invite")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmInvitationAsync(string token)
        {
            var result = await _shareSrv.ConfirmInvitationAsync(_helper.GetIdentityUserIdByClaims(User.Claims), token);

            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Data.Equals("302-1"))
            {
                return Redirect("~/account/register");
            }
            else if (result.Data.Equals("302-2"))
            {
                return Redirect("~/connect/token");
            }
            return BadRequest(result);
        }

        [HttpGet]
        [Route("invite/accept")]
        public IActionResult AcceptInvite(string listId)
        {
            var result = _shareSrv.AcceptInvite(_helper.GetAppUserIdByClaims(User.Claims), listId);

            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost]
        [Route("invite")]
        public IActionResult InviteUser(string listId, string email)
        {
            var user = _helper.GetAppUserByClaims(User.Claims);

            var result = _shareSrv.InviteByEmail(user.Id, listId, email);

            if (result.Success)
            {
                var code = (string)result.Data;

                SendInvitationEmail(email,
                                    code,
                                    "ConfirmInvitation",
                                    $"{user.FirstName} {user.LastName} \"{user.Login}\" shared geolist with you");

                return Ok(result);
            }

            return BadRequest(result);
        }




        [HttpGet]
        [Route("allowed-users")]
        public IActionResult GetAllowedUsers(string listId)
        {
            var result = _shareSrv.GetAllowedUsers(_helper.GetAppUserIdByClaims(User.Claims), listId);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        private void SendInvitationEmail(string email, string code, string action, string subject)
        {
            var callbackUrl = Url.Action(action,
                                         "Sharing",
                                         code,
                                         protocol: HttpContext.Request.Scheme);

            _emailSvc.Send(new EmailMessage()
            {
                FromAddress = new EmailAddress()
                {
                    Name = "GeopingTeam",
                    Address = "test@geoping.info"
                },
                ToAddress = new EmailAddress()
                {
                    Name = email,
                    Address = email
                },
                Subject = subject,
                Content = _emailSvc.GetConfirmationMail(email, callbackUrl)
            });
        }
    }
}
