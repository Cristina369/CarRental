using CarRental.API.Models.Domain;

namespace CarRental.API.Models.ViewModels
{
	public class CarDetailsViewModel
	{
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
	}
}
