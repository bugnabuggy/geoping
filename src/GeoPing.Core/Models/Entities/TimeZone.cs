namespace GeoPing.Core.Models.Entities
{
    public class TimeZone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public int GMTOffset { get; set; }
    }
}
