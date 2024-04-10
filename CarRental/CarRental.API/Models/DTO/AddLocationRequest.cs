namespace CarRental.API.Models.DTO
{
    public class AddLocationRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Phone { get; set; }
    }
}
