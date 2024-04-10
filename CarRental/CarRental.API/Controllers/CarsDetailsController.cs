using CarRental.API.Models.ViewModels;
using CarRental.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    public class CarsDetailsController : Controller
    {
        private readonly ICarRepository carRepository;
		private readonly ICarReservationRepository carReservationRepository;

		public CarsDetailsController(ICarRepository carRepository, ICarReservationRepository carReservationRepository)
        {
            this.carRepository = carRepository;
			this.carReservationRepository = carReservationRepository;
		}

        [HttpGet]
        public async Task<IActionResult> Index(Guid id)
        {
            var car = await carRepository.GetAsync(id);
			var carReservationViewModel = new CarReservationViewModel();


			if (car != null)
            {
                //var totalReservations = await carReservationRepository.GetTotalReservations(car.Id);

				carReservationViewModel = new CarReservationViewModel
				{
					Id = car.Id,
					Price = car.Price,
					Year = car.Year,
					Type = car.Type,
					Description = car.Description,
					ImageCar = car.ImageCar,
					Available = car.Available,
					Model = car.Model,
					Location = car.Location,
					//TotalReservations = totalReservations
				};
			}
            return View(carReservationViewModel);
        }
    }
}
