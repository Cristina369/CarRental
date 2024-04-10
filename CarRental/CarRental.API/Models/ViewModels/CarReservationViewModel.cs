using CarRental.API.Models.Domain;

namespace CarRental.API.Models.ViewModels
{
	public class CarReservationViewModel
	{
		public Guid Id { get; set; }
		public double Price { get; set; }
		public int Year { get; set; }
		public string Type { get; set; }
		public string Description { get; set; }
		public string ImageCar { get; set; }
		public bool Available { get; set; }
		// public Guid LocationId { get; set;}
		public Guid ModelId { get; set; }
		public Model Model { get; set; }
		public Guid LocationId { get; set; }
		public Location Location { get; set; }
		public int TotalReservations { get; set; }
		public DateTime DateReservation { get; set; }
		public string Details { get; set; }
		public DateTime PickUpDate { get; set; }
		public DateTime ReturnDate { get; set; }
		public Guid PickUpLocationId { get; set; }
		public Location PickUpLocation { get; set; }
		public Guid ReturnLocationId { get; set; }
		public Location ReturnLocation { get; set; }
	}
}
