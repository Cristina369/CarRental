namespace CarRental.API.Models.ViewModels
{
	public class HomeViewModel
	{
        public string PickupDate { get; set; }
        public string ReturnDate { get; set; }
        public Guid PickupLocation { get; set; }
        public Guid ReturnLocation { get; set; }

	}
}
