namespace GeoPing.Core.Interfaces
{
    public interface IPaginationFilter
    {
        int? PageSize { get; set; }
        int? PageNumber { get; set; } 
    }
}
