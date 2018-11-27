namespace GeoPing.Core.Interfaces
{
    public interface IOrderFilter
    {
        string OrderBy { get; set; }
        bool IsDesc { get; set; }
    }
}
