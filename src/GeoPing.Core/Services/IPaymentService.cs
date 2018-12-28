using System;
using System.Threading.Tasks;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;

namespace GeoPing.Core.Services
{
    public interface IPaymentService
    {
        Task<OperationResult> PurchasePremiumWithYandex(Guid userId, PurchaseDTO purchase);
        Task<OperationResult> PurchasePremiumWithPayPal(GeoPingUser user, PurchaseDTO purchase);
        Task<OperationResult> ProcessTheYandexCallback(object order);
        Task<OperationResult> ProcessThePayPalCallback(Guid userId, string token, string payerId, string paymentId);
    }
}
