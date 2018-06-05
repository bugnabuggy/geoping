using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApi.Configuration;
using WebApi.Models;
using WebApi.Models.DTO;


namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Identity")]
    [Authorize]
    public class IdentityController : Controller
    {
        private UserManager<TMUser> _userManager;

        public IdentityController(UserManager<TMUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }
        
        [HttpGet("antiforgery")]
        public IActionResult GetAntiforgeryKey()
        {
            var key = Guid.NewGuid();
            var validTill = DateTime.UtcNow.AddMinutes(5);

            // cleanup
            var keysToRemove = Constants.AntiforgeryKeys.Where(pair => pair.Value <= DateTime.UtcNow);
            foreach (var keyValuePair in keysToRemove)
            {
                Constants.AntiforgeryKeys.Remove(keyValuePair.Key);
            }

            Constants.AntiforgeryKeys.Add(key, validTill);
            return Ok(key);
        }

        [HttpPost("password")]
        public async Task<IActionResult> ChangePasword([FromBody]ChangePasswordDto model)
        {
            try
            {
                if (Constants.AntiforgeryKeys.ContainsKey(model.Key))
                {
                    var sub = User.Claims.FirstOrDefault(x => x.Type.Equals("sub"));

                    var user = await _userManager.FindByIdAsync(sub.Value);
                    var result = await _userManager.ChangePasswordAsync(user, model.Password, model.NewPassword);
                    if (!result.Succeeded)
                    {
                        return BadRequest(result.Errors);
                    }
                }
                else
                {
                    return BadRequest("Wrong key");
                }
            }
            catch (Exception exp)
            {
                return BadRequest("Data is wrong or Server error occured");
            }

            return Ok("Password has been changed");
        }
    }
}
