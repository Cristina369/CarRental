using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Models.Domain
{
    public class CarReservation
    {
        public Guid Id { get; set; }
        public Guid CarId { get; set; }
        [DeleteBehavior(DeleteBehavior.Restrict)]
        public Car Car { get; set; }
		public Guid UserId { get; set; }
		// public User User { get; set; }
        public DateTime DateReservation { get; set; }
		public DateTime PickUpDate { get; set; }
		public DateTime ReturnDate { get; set; }
		public Guid PickUpLocationId { get; set; }
        [DeleteBehavior(DeleteBehavior.Restrict)]
        public Location PickUpLocation { get; set; }
		public Guid ReturnLocationId { get; set; }
        [DeleteBehavior(DeleteBehavior.Restrict)]
        public Location ReturnLocation { get; set; }
		public string Details { get; set; }


    }
}
