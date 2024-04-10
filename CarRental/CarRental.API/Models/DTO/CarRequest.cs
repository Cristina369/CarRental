using Microsoft.AspNetCore.Mvc.Rendering;

namespace CarRental.API.Models.DTO
{
    public class CarRequest
    {
        public Guid Id { get; set; }
        public double Price { get; set; }
        public int Year { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string ImageCar { get; set; }
        public bool Available { get; set; }
        public Guid ModelId { get; set; }
        public string ModelName { get; set; }
        public string MakeName { get; set; }
        public Guid LocationId { get; set; }
        public string LocationName { get; set; }

    }
}
