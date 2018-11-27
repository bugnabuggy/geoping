namespace GeoPing.Core.Models.DTO
{
    public class ChangePasswordDTO : NewPasswordDTO 
    {
        public string OldPassword { get; set; }
    }
}
