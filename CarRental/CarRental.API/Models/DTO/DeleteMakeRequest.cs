using CarRental.API.Models.Domain;

namespace CarRental.API.Models.DTO
{
    public class DeleteMakeRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; } 

    }
}
