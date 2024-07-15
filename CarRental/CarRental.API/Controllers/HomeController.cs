using CarRental.API.Models.DTO;
using CarRental.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;


namespace CarRental.API.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ICarRepository carRepository;
        private readonly IMakeRepository makeRepository;
        private readonly IModelRepository modelRepository;
        private readonly ILocationRepository locationRepository;

        public HomeController(ILogger<HomeController> logger,
            ICarRepository carRepository,
            IMakeRepository makeRepository, IModelRepository modelRepository, ILocationRepository locationRepository)
        {
            _logger = logger;
            this.carRepository = carRepository;
            this.makeRepository = makeRepository;
            this.modelRepository = modelRepository;
            this.locationRepository = locationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string PickupDate, string ReturnDate, Guid PickupLocation, Guid ReturnLocation)
        {
        
            var availableCars = await carRepository.GetAvailableCarsAsync(PickupDate, ReturnDate, PickupLocation, ReturnLocation);

            var modelDM = await modelRepository.GetAllAsync();
            var locationDM = await locationRepository.GetAllAsync();
            var makeDM = await makeRepository.GetAllAsync();

            var response = new List<CarRequest>();
            foreach (var car in availableCars)
            {
                var model = modelDM.FirstOrDefault(m => m.Id == car.ModelId);
                var make = makeDM.FirstOrDefault(m => m.Id == model.MakeId);
                var location = locationDM.FirstOrDefault(m => m.Id == car.LocationId);

                var modelName = model != null ? model.Name : "Unknown";
                var makeName = make != null ? make.Name : "Unknown";
                var locationName = location != null ? location.Name : "Unknown";


                response.Add(new CarRequest
                {
                    Id = car.Id,
                    Price = car.Price,
                    Year = car.Year,
                    Type = car.Type,
                    Description = car.Description,
                    ImageCar = car.ImageCar,
                    Available = car.Available,
                    ModelId = car.ModelId,
                    ModelName = modelName,
                    MakeName = makeName,
                    LocationId = car.LocationId,
                    LocationName = locationName


                });
            }
            return Ok(response);

        }

    }
}