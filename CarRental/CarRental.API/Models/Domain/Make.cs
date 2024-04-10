namespace CarRental.API.Models.Domain
{
	public class Make
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public ICollection<Model> Models { get; set; } 

	}
}
