using Microsoft.AspNetCore.Mvc.Rendering;

namespace CarRental.API.Models.DTO
{
    public class ModelRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string MakeName { get; set; }
        public int CarCount { get; set; }
        public Guid MakeId { get; set; }
    }
}
