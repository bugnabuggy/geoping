﻿namespace GeoPing.Core.Models.DTO
{
    public class GeolistFilterDTO: StandartFilterDTO
    {
        public string Name { get; set; }
        public string DateCreatedFrom { get; set; }
        public string DateCreatedTo { get; set; }
        public string DateEditedFrom { get; set; }
        public string DateEditedTo { get; set; }
    }
}
