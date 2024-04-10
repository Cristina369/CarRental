using CarRental.API.Models.Domain;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CarRental.API.Models.DTO
{
    public class AddReservationRequest
    {
        public Guid Id { get; set; }
        public string SelectedCarId { get; set; }
        public string SelectedUser { get; set; }
        public string DateReservation { get; set; }
        public string PickUpDate { get; set; }
        public string ReturnDate { get; set; }
        public string Details { get; set; }
        //public IEnumerable<SelectListItem> Locations { get; set; }
        public string SelectedPickUpLocation { get; set; }
        public string SelectedReturnLocation { get; set; }
    }
}
