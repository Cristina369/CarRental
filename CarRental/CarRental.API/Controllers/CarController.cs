using CarRental.API.Data;
using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;
using CarRental.API.Repositories.Implementation;
using CarRental.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CarRental.API.Controllers
{
	//[Authorize(Roles = "SuperAdmin")]
	public class CarController : Controller
	{
		private readonly IModelRepository modelRepository;
		private readonly ILocationRepository locationRepository;
		private readonly IMakeRepository makeRepository;
		private readonly ICarRepository carRepository;

		public CarController(ICarRepository carRepository, IModelRepository modelRepository, ILocationRepository locationRepository, IMakeRepository makeRepository)
		{
			this.modelRepository = modelRepository;
			this.locationRepository = locationRepository;
			this.makeRepository = makeRepository;
			this.carRepository = carRepository;
		}

		[HttpGet]
		public async Task<IActionResult> Add()
		{
			return Ok();
		}


		[HttpPost]
		public async Task<IActionResult> Add([FromBody] AddCarRequest addCarRequest)
		{
			if (addCarRequest == null)
			{
				return BadRequest("Invalid model data.");
			}

			var car = new Car
			{
				Price = addCarRequest.Price,
				Year = addCarRequest.Year,
				Type = addCarRequest.Type,
				Description = addCarRequest.Description,
				ImageCar = addCarRequest.ImageCar,
				Available = addCarRequest.Available
			};

			if (!Guid.TryParse(addCarRequest.SelectedLocation, out Guid selectedLocationIdGuid))
			{
				return BadRequest("Invalid selected Location ID format.");
			}

			if (!Guid.TryParse(addCarRequest.SelectedModel, out Guid selectedModelIdGuid))
			{
				return BadRequest("Invalid selected Model ID format.");
			}

			var existingModel = await modelRepository.GetAsync(selectedModelIdGuid);
			var existingLocation = await locationRepository.GetAsync(selectedLocationIdGuid);

			if (existingModel != null && existingLocation != null)
			{
				car.ModelId = existingModel.Id;
				car.LocationId = existingLocation.Id;
			}
			else
			{
				return BadRequest("Selected Model Or Location not found.");
			}


			try
			{
				await carRepository.AddAsync(car);

				var response = new AddCarRequest
				{
					Id = car.Id,
					Price = car.Price,
					Year = car.Year,
					Type = car.Type,
					Description = car.Description,
					ImageCar = car.ImageCar,
					Available = car.Available,
					SelectedModel = car.ModelId.ToString(),
					SelectedLocation = car.LocationId.ToString()
				};

				return Ok(response);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while adding the car.");
			}

		}


		[HttpGet]
		public async Task<IActionResult> List()
		{
			var cars = await carRepository.GetAllAsync();
			var modelDM = await modelRepository.GetAllAsync();
			var locationDM = await locationRepository.GetAllAsync();
			var makeDM = await makeRepository.GetAllAsync();

			var response = new List<CarRequest>();
			foreach (var car in cars)
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
			return Ok(response);// return View(models);
		}

		[HttpGet]
		public async Task<IActionResult> Edit([FromRoute] Guid id)
		{
			var car = await carRepository.GetAsync(id);
            var makeDM = await makeRepository.GetAllAsync();
            var modelDM = await modelRepository.GetAllAsync();
			var locationDM = await locationRepository.GetAllAsync();

			if (car != null)
			{

                var model = modelDM.FirstOrDefault(m => m.Id == car.ModelId);
                var make = makeDM.FirstOrDefault(m => m.Id == model.MakeId);
                var location = locationDM.FirstOrDefault(m => m.Id == car.LocationId);

                var modelName = model != null ? model.Name : "Unknown";
                var makeName = make != null ? make.Name : "Unknown";
                var locationName = location != null ? location.Name : "Unknown";


                var response = new CarRequest
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
				};
				return Ok(response);
			}

			return NotFound();
		}

		[HttpPut]
		public async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] EditCarRequest editCarRequest)
		{
			if (editCarRequest == null)
			{
				return BadRequest("Invalid car data.");
			}

			var carModelDM = new Car
			{
				Id = id,
				Price = editCarRequest.Price,
				Year = editCarRequest.Year,
				Type = editCarRequest.Type,
				Description = editCarRequest.Description,
				ImageCar = editCarRequest.ImageCar,
				Available = editCarRequest.Available,
			};


			var selectedModelIdGuid = Guid.Parse(editCarRequest.SelectedModel);
			var existingModel = await modelRepository.GetAsync(selectedModelIdGuid);

			if (existingModel != null)
			{
				carModelDM.ModelId = existingModel.Id;
			}

			var selectedLocationIdGuid = Guid.Parse(editCarRequest.SelectedLocation);
			var existingLocation = await locationRepository.GetAsync(selectedLocationIdGuid);

			if (existingLocation != null)
			{
				carModelDM.LocationId = existingLocation.Id;
			}

			var updatedCar = await carRepository.UpdateAsync(carModelDM);

			if (updatedCar == null)
			{
				return NotFound();
			}

			var response = new CarRequest
			{
				Id = carModelDM.Id,
				Price = carModelDM.Price,
				Year = carModelDM.Year,
				Type = carModelDM.Type,
				Description = carModelDM.Description,
				ImageCar = carModelDM.ImageCar,
				Available = carModelDM.Available,
				ModelId = carModelDM.ModelId,
				LocationId = carModelDM.LocationId,
			};

			return Ok(response);

		}

		[HttpDelete]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
			var deletedCar = await carRepository.DeleteAsync(id);

			if (deletedCar == null)
			{
				return NotFound();
			}

			var response = new CarRequest
			{
				Id = deletedCar.Id,
				Price = deletedCar.Price,
				Year = deletedCar.Year,
				Type = deletedCar.Type,
				Description = deletedCar.Description,
				ImageCar = deletedCar.ImageCar,
				Available = deletedCar.Available,
				ModelId = deletedCar.ModelId,
				LocationId = deletedCar.LocationId,

			};

			return Ok(response);
		}


		[HttpGet]
		[ActionName("GetCarsByType")]
		public async Task<IActionResult> GetCarsByType([FromQuery] string type)
		{
			try
			{
				var cars = await carRepository.GetCarsByTypeAsync(type);

				if (cars == null || !cars.Any())
				{
					return Ok("No cars of this type found!"); 
				}

				return Ok(cars);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}


		}


        [HttpGet]
		[ActionName("GetCarTypes")]
        public async Task<ActionResult<IEnumerable<string>>> GetCarTypes()
        {
            try
            {
                var carTypes = await carRepository.GetCarTypesAsync();

                var response = new List<CarTypeRequest>();
				foreach (var carType in carTypes)
				{
					response.Add( new CarTypeRequest
                    {
						carType = carType
					});
				}

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

