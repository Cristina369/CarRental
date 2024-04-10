using CarRental.API.Models.Domain;

namespace CarRental.API.Models.ViewModels
{
    public class SearchViewModel
    {
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public string PickupLocation { get; set; }
        public string ReturnLocation { get; set; }
        public IEnumerable<Car> Cars { get; set; }
        public IEnumerable<Make> Makes { get; set; }
        public IEnumerable<Location> Locations { get; set; }
    }
}
