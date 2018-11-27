using GeoPing.Core.Interfaces;

namespace GeoPing.Core.Models.DTO
{
    public class StandartFilterDTO : IOrderFilter, IPaginationFilter
    {
        public string OrderBy { get; set; }
        public bool IsDesc { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
    }
}
