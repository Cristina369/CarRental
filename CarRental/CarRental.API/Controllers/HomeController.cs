using CarRental.API.Models;
using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;
using CarRental.API.Models.ViewModels;
using CarRental.API.Repositories.Implementation;
using CarRental.API.Repositories.Interface;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Diagnostics;

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
        public async Task<IActionResult> Index()
        {
            var cars = await carRepository.GetAllAsync();
            var makes = await makeRepository.GetAllAsync();

            var model = new HomeViewModel
            {
                // Cars = cars,
                // Makes = makes
            };

            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public async Task<IActionResult> GetMatchingLocations([FromQuery] string locationSearch)
        {
            try
            {
                var cars = await carRepository.GetAllAsync();
                var matchingLocations = cars
                    .Select(car => new Location
                    {
                        Id = car.Location.Id,
                        Street = car.Location.Street,
                        City = car.Location.City,
                        Phone = car.Location.Phone,
                        Name = car.Location.Name
                    })
                    // .Distinct()
                    .Where(location => location.City.StartsWith(locationSearch, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                //foreach (var location in matchingLocations)
                //{
                //    Console.WriteLine($"Location ID: {location.Id}, Street: {location.Street}, City: {location.City}, Phone: {location.Phone}, Name: {location.Name}");
                //}

                var response = new List<Location>();
                foreach (var matchingLocation in matchingLocations)
                {
                    response.Add(new Location
                    {
                        Id = matchingLocation.Id,
                        Street = matchingLocation.Street,
                        City = matchingLocation.City,
                        Phone = matchingLocation.Phone,
                        Name = matchingLocation.Name
                    });
                }
                return Json(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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

            //return Ok(availableCars);
        }

    }
}