using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Core;
using GeoPing.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GeoPing.Services
{
    public class PayPalTokenHelper: IPayPalTokenHelper
    {
        private IHttpClientFactory _httpClientFactory;
        private ILogger<PayPalTokenHelper> _logger;
        private ApplicationSettings _settings;
        private PayPalTokenHolder _holder;

        public PayPalTokenHelper
            (IHttpClientFactory httpClientFactory,
            ILogger<PayPalTokenHelper> logger,
            IOptions<ApplicationSettings> settings)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
            _settings = settings.Value;
            _holder = PayPalTokenHolder.GetPPTokenHolder();
        }

        public async Task<string> GetToken()
        {
            if (_holder.GetExpireTime() < DateTime.UtcNow)
            {
                await SetNewToken();
            }

            return _holder.GetToken();
        }

        private async Task<bool> SetNewToken()
        {
            var client = _httpClientFactory.CreateClient();

            var request = new HttpRequestMessage
                (HttpMethod.Post, "https://api.sandbox.paypal.com/v1/oauth2/token");

            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("Accept_Language", "en_US");
            request.Headers.Authorization = AuthenticationHeaderValue.Parse($"Basic {GetAuthData()}");

            request.Content = new FormUrlEncodedContent(new Dictionary<string, string>()
            {
                { "grant_type", "client_credentials" }
            });

            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return false;
            }

            var responseContent = JsonConvert.DeserializeObject<JObject>
                (await response.Content.ReadAsStringAsync());

            var nonce = DateTime.Parse(responseContent["nonce"].ToString().Substring(0, 20));


            _holder.SetHolder
                (responseContent["access_token"].ToString(),
                nonce.AddSeconds(responseContent["expires_in"].ToObject<int>()));

            return true;
        }

        private string GetAuthData()
        {
            var authData = $"{_settings.PayPalCash.ClientId}:{_settings.PayPalCash.ClientSecret}";

            return Convert.ToBase64String(Encoding.UTF8.GetBytes(authData));
        }

        private class PayPalTokenHolder
        {
            private static readonly PayPalTokenHolder Holder = new PayPalTokenHolder();

            private static string Token { get; set; }
            private static DateTime ExpireTime { get; set; }

            private PayPalTokenHolder()
            {
                Token = "";
                ExpireTime = DateTime.UtcNow;
            }

            public static PayPalTokenHolder GetPPTokenHolder()
            {
                return Holder;
            }

            public string GetToken()
            {
                return Token;
            }

            public DateTime GetExpireTime()
            {
                return ExpireTime;
            }

            public void SetHolder(string token, DateTime time)
            {
                Token = token;
                ExpireTime = time;
            }
        }
    }
}
