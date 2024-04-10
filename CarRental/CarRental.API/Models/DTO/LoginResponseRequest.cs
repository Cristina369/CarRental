namespace CarRental.API.Models.DTO
{
    public class LoginResponseRequest
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
    }
}
