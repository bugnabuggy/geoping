using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;

namespace GeoPing.Core.Services
{
    public interface IPaymentService
    {
        Task<OperationResult> PurchasePremiumWithYandex(Guid userId, PurchaseDTO purchase);
    }
}
