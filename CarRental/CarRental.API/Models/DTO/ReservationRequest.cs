namespace CarRental.API.Models.DTO
{
    public class ReservationRequest
    {
        public Guid Id { get; set; }
        public string SelectedCarModel { get; set; }
        public string SelectedUserName { get; set; }
        public string SelectedUserEmail { get; set; }
        public string DateReservation { get; set; }
        public string PickUpDate { get; set; }
        public string ReturnDate { get; set; }
        public string Details { get; set; }
        public string PickUpLocationName { get; set; }
        public string ReturnLocationName { get; set; }
    }
}
