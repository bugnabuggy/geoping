using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit.Encodings;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GeoPing.Services
{
    public class PaymentService : IPaymentService
    {
        private ILogger<PaymentService> _logger;
        private ApplicationSettings _settings;
        private IHttpClientFactory _clientBuilder;

        public PaymentService
            (ILogger<PaymentService> logger,
            IOptions<ApplicationSettings> settings,
            IHttpClientFactory clientBuilder)
        {
            _logger = logger;
            _settings = settings.Value;
            _clientBuilder = clientBuilder;
        }

        public async Task<OperationResult> PurchasePremiumWithYandex(Guid userId, PurchaseDTO purchase)
        {
            if (!purchase.CommodityName.Equals("premium"))
            {
                _logger.LogWarning($"User::[{userId}] tried to order \"{purchase.CommodityName}\", " +
                                   $"but requested purchase of \"premium\".");

                return new OperationResult
                {
                    Messages = new[] { "Invalid commodity name." }
                };
            }

            _logger.LogInformation($"User::[{userId}] requested purchase of \"premium\" for {purchase.Amount} months.");

            var payment = new PaymentDTO
            {
                amount = new PaymentAmountDTO
                {
                    currency = "RUB",
                    value = (100.00 * purchase.Amount).ToString()
                },
                confirmation = new PaymentConfirmationDTO
                {
                    return_url = _settings.Urls.SiteUrl,
                    type = "redirect"
                },
                capture = true,
                description = "Order for premium status."
            };

            var httpClient = _clientBuilder.CreateClient();

            var idempotenceKey = Guid.NewGuid().ToString();

            _logger.LogDebug($"Formation of a HTTP-request for the purchase of premium-status by user::[{userId}]");

            var request = new HttpRequestMessage
                (HttpMethod.Post, 
                "https://payment.yandex.net/api/v3/payments");

            var authData = $"{_settings.YandexCash.StoreId}:{_settings.YandexCash.Key}";

            request.Headers.Add("Idempotence-Key", idempotenceKey);
            request.Headers.Add("Authorization", $"Basic {Convert.ToBase64String(Encoding.UTF8.GetBytes(authData))}");

            request.Content = new StringContent(JsonConvert.SerializeObject(payment), Encoding.UTF8, "application/json");

            _logger.LogDebug($"Sending the HTTP-request for the purchase of premium-status by user::[{userId}]");

            var response = JsonConvert.DeserializeObject<JObject>
                (await (await httpClient.SendAsync(request))
                .Content.ReadAsStringAsync());

            _logger.LogDebug($"Response for the HTTP-request for the purchase of premium-status " +
                             $"by user::[{userId}] has been received.");

            return new OperationResult()
            {
                Success = true,
                Messages = new []{"The operation has been accepted. Please follow the link to confirm the operation."},
                Data = response["confirmation"]["confirmation_url"]
            };
        }
    }
}
