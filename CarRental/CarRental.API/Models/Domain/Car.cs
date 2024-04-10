namespace CarRental.API.Models.Domain
{
	public class Car
	{
        public Guid Id { get; set; }
		public double Price { get; set; }
		public int Year { get; set; }
		public string Type { get; set; }
		public string Description { get; set; }
		public string ImageCar {  get; set; }
		public bool Available { get; set; }
		// public Guid LocationId { get; set;}
		public Guid ModelId { get; set; }
		public Model Model { get; set; }
		public Guid LocationId { get; set; }
		public Location Location { get; set; }
		public ICollection<CarReservation> Reservations { get; set; }

	}
}
