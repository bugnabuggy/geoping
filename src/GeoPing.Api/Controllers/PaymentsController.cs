using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace GeoPing.Api.Controllers
{
    [Authorize]
    [Route("api/payments")]
    public class PaymentsController:Controller
    {
        private IPaymentService _paymentSrv;
        private IClaimsHelper _helper;

        public PaymentsController(IPaymentService paymentSrv, IClaimsHelper helper)
        {
            _paymentSrv = paymentSrv;
            _helper = helper;
        }

        // POST /api/payments/result/yandex
        [HttpPost("result/yandex")]
        [AllowAnonymous]
        public async Task<IActionResult> ProcessTheYandexNotification([FromBody] JObject data)
        {
            var result = await _paymentSrv.UpgradeUserAccount(data);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // POST /api/payments/premium/yandex
        [HttpPost("premium/yandex")]
        public async Task<IActionResult> PurchasePremiumStatusWithYandex([FromBody]PurchaseDTO purchase)
        {
            var result = await _paymentSrv.PurchasePremiumWithYandex(_helper.GetAppUserIdByClaims(User.Claims), purchase);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        // POST /api/payments/premium/robokassa
        [HttpPost("premium/robokassa")]
        public async Task<IActionResult> PurchasePremiumStatusWithRoboKassa([FromBody]PurchaseDTO purchase)
        {
            var result = await _paymentSrv.PurchasePremiumWithRoboKassa(_helper.GetAppUserIdByClaims(User.Claims), purchase);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
