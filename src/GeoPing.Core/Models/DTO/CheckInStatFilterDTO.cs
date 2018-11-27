namespace GeoPing.Core.Models.DTO
{
    public class CheckInStatFilterDTO : StandartFilterDTO
    {
        public string UserId { get; set; }
        public string DatePeriodFrom { get; set; }
        public string DatePeriodTo { get; set; }        
    }
}
