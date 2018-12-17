namespace GeoPing.Core.Models.DTO
{
    public class RegisterUserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string TimeZone { get; set; }
        public string Token { get; set; }
    }
}
