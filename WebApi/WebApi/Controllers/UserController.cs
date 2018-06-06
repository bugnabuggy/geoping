using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Configuration;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private UserManager<TMUser> _userManager;

        public UserController(UserManager<TMUser> userManager)
        {
            _userManager = userManager;
        }


        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody]RegistrationDTO model)
        {
            var users = new Dictionary<TMUser, string>()
            {
                {new TMUser(){ UserName = model.Login}, model.Password},
            };
            foreach (var user in users)
            {
                if (!_userManager.Users.Any(u => u.UserName.Equals(user.Key.UserName)))
                {
                    var task = _userManager.CreateAsync(user.Key, user.Value);
                    task.Wait(Constants.AsyncTaskWaitTime);
                    var result = task.Result;
                    if (!result.Succeeded)
                    {
                        return BadRequest("user already exists");
                    }
                }
            }
            return Ok("Succssesful registration");
        }
    }
}