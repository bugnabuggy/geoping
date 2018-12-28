using System.Threading.Tasks;

namespace GeoPing.Services.Interfaces
{
    public interface IPayPalTokenHelper
    {
        Task<string> GetToken();
    }
}
