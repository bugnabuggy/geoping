using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        // POST /api/payments/premium
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
    }
}
