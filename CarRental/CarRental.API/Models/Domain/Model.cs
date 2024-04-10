namespace CarRental.API.Models.Domain
{
	public class Model
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public Guid MakeId { get; set; }
		public Make Make { get; set; }
		public ICollection<Car> Cars { get; set; }
	}
}
