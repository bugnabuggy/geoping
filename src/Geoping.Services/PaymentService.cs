using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GeoPing.Services
{
    public class PaymentService : IPaymentService
    {
        private ILogger<PaymentService> _logger;
        private ApplicationSettings _settings;
        private IHttpClientFactory _clientBuilder;
        private IRepository<Order> _orderRepo;
        private IRepository<Commodity> _commodityRepo;
        private IGeopingUserService _userSrv;

        public PaymentService
            (ILogger<PaymentService> logger,
            IOptions<ApplicationSettings> settings,
            IHttpClientFactory clientBuilder,
            IRepository<Order> orderRepo,
            IRepository<Commodity> commodityRepo,
            IGeopingUserService userSrv)
        {
            _logger = logger;
            _settings = settings.Value;
            _clientBuilder = clientBuilder;
            _orderRepo = orderRepo;
            _commodityRepo = commodityRepo;
            _userSrv = userSrv;
        }

        public async Task<OperationResult> PurchasePremiumWithYandex(Guid userId, PurchaseDTO purchase)
        {
            _logger.LogInformation($"User::[{userId}] requested purchase commodity::[{purchase.CommodityId}] in the amount of {purchase.Amount}.");

            var commodity = _commodityRepo.Get().FirstOrDefault(x => x.Id == purchase.CommodityId);


            if (commodity == null)
            {
                _logger.LogWarning($"User::[{userId}] tried to order commodity::[{purchase.CommodityId}], " +
                                   $"but it doesn`t exist.");

                return new OperationResult
                {
                    Messages = new[] { "Invalid commodity Id." }
                };
            }

            var payment = new PaymentDTO
            {
                amount = new PaymentAmountDTO
                {
                    currency = "RUB",
                    value = (commodity.Cost * purchase.Amount).ToString()
                },
                confirmation = new PaymentConfirmationDTO
                {
                    return_url = _settings.YandexCash.RedirectPage,
                    type = "redirect"
                },
                capture = true,
                description = $"Order for premium status [{userId}]."
            };

            var httpClient = _clientBuilder.CreateClient();
            
            _logger.LogDebug($"Formation of a HTTP-request for the purchase of premium-status by user::[{userId}]");

            var request = new HttpRequestMessage
                (HttpMethod.Post,
                "https://payment.yandex.net/api/v3/payments");

            // TODO: implement Idempotence
            request.Headers.Add("Idempotence-Key", Guid.NewGuid().ToString());
            request.Headers.Add("Authorization", $"Basic {GetYandexAuthData()}");

            request.Content = new StringContent(JsonConvert.SerializeObject(payment), Encoding.UTF8, "application/json");

            _logger.LogDebug($"Sending the HTTP-request for the purchase of premium-status by user::[{userId}]");

            var response = await httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Something has been failed while sending request. Check what was wrong!");

                return new OperationResult()
                {
                    Messages = new[] { "Something has been failed while sending request." }
                };
            }

            var responseContent = JsonConvert.DeserializeObject<JObject>(await response.Content.ReadAsStringAsync());

            _orderRepo.Add(new Order
            {
                Id = responseContent["id"].ToObject<Guid>(),
                Amount = purchase.Amount,
                CommodityId = commodity.Id,
                UserId = userId,
                Date = DateTime.UtcNow
            });

            _logger.LogDebug($"Response for the HTTP-request for the purchase of premium-status " +
                             $"by user::[{userId}] has been received.");

            return new OperationResult()
            {
                Success = true,
                Messages = new[] { "The operation has been accepted. Please follow the link to confirm the operation." },
                Data = responseContent["confirmation"]["confirmation_url"]
            };
        }

        public async Task<OperationResult> PurchasePremiumWithRoboKassa(Guid userId, PurchaseDTO purchase)
        {
            throw new NotImplementedException();
        }

        public async Task<OperationResult> UpgradeUserAccount(object data)
        {
            // TODO: Should this code be there. (No)
            //
            //if (!data["event"].ToString().Equals("payment.succeeded"))
            //{
            //    _logger.LogWarning($"Warning! Event type of received data is not \"payment.succeeded\"!");

            //    return new OperationResult
            //    {
            //        Messages = new[] { "No actions were done. Waiting for succeeded payment notification." }
            //    };
            //}

            var jData = JObject.FromObject(data);

            Guid paymentId;

            try
            {
                paymentId = jData["object"]["id"].ToObject<Guid>();
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while the processing \"Yandex notification\", but seems it`s wrong.", ex);

                throw;
            }

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://payment.yandex.net/api/v3/payments/{paymentId}");

            request.Headers.Add("Authorization", $"Basic {GetYandexAuthData()}");

            var httpClient = _clientBuilder.CreateClient();

            var response = await httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError($"Something has been failed while sending request. Check what was wrong! " +
                                 $"PaymentId = [{paymentId}]");

                return new OperationResult();
            }

            var responseContent = JsonConvert.DeserializeObject<JObject>(await response.Content.ReadAsStringAsync());

            if (!responseContent["status"].ToString().Equals("succeeded"))
            {
                _logger.LogWarning($"Warning! Event type of received data was \"payment.succeeded\", but Yandex.API says it`s not!");

                return new OperationResult
                {
                    Messages = new[] { "No actions were done. Waiting for succeeded payment notification." }
                };
            }

            var order = _orderRepo.Data.FirstOrDefault(x => x.Id == paymentId);

            var commodity = _commodityRepo.Get().FirstOrDefault(x => x.Id == order.CommodityId);

            if (order == null || commodity == null)
            {
                _logger.LogError($"Yandex.API said there was succeeded payment, but paid order hasn`t been found!");

                return new OperationResult()
                {
                    Messages = new[] { "Order wasn`t found." }
                };
            }

            _userSrv.UpgradeToPremiumForATime(order.UserId, commodity.Quantity);

            _orderRepo.Delete(order);

            return new OperationResult()
            {
                Success = true
            };
        }

        private string GetYandexAuthData()
        {
            var authData = $"{_settings.YandexCash.StoreId}:{_settings.YandexCash.Key}";

            return Convert.ToBase64String(Encoding.UTF8.GetBytes(authData));
        }
    }
}
