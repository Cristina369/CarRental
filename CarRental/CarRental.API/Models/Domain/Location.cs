using System.ComponentModel.DataAnnotations;

namespace CarRental.API.Models.Domain
{
	public class Location
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string City { get; set; }
		public string Street { get; set; }

		// [DataType(DataType.PhoneNumber)]
		public string Phone { get; set; }
		public ICollection<Car> Cars { get; set; }

	}
}
