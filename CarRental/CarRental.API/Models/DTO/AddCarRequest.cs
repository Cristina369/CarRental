using CarRental.API.Models.Domain;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CarRental.API.Models.DTO
{
    public class AddCarRequest
    {
        public Guid Id { get; set; }
        public double Price { get; set; }
        public int Year { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string ImageCar { get; set; }
        public bool Available { get; set; }
        // public Guid LocationId { get; set; }
        //public IEnumerable<SelectListItem> Models { get; set; }
        public string SelectedModel { get; set; }

        //public IEnumerable<SelectListItem> Locations { get; set; }
        public string SelectedLocation { get; set; }
    }
}
