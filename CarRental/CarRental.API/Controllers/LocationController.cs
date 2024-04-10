using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;
using CarRental.API.Models.ViewModels;
using CarRental.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    //[Authorize(Roles = "SuperAdmin")]
    public class LocationController : Controller
	{
		private readonly ILocationRepository locationRepository;

		public LocationController(ILocationRepository locationRepository)
        {
			this.locationRepository = locationRepository;
		}

		[HttpGet]
        public IActionResult Add()
		{
			return View();
		}

		[HttpPost]
		[ActionName("Add")]
		public async Task<IActionResult> Add([FromBody] AddLocationRequest addLocationRequest)
		{
			var location = new Location
			{
				Name = addLocationRequest.Name,
				City = addLocationRequest.City,
				Street = addLocationRequest.Street,
				Phone = addLocationRequest.Phone
			};

			await locationRepository.AddAsync(location);

			var response = new AddLocationRequest
			{
				Id = location.Id,
				Name = location.Name,
				City = location.City,
				Street = location.Street,
				Phone = location.Phone
			};

			return Ok(response);
		}

		[HttpGet]
        [ActionName("List")]
        public async Task<IActionResult> List()
		{
			var locations = await locationRepository.GetAllAsync();

			var response = new List<AddLocationRequest>();
			foreach(var location in locations)
			{
				response.Add(
					new AddLocationRequest
					{
						Id = location.Id,
						Name = location.Name,
						City = location.City,
						Street = location.Street,
						Phone = location.Phone
					});
			}
			return Ok(response);
		}

		[HttpGet]
		public async Task<IActionResult> Edit([FromRoute] Guid id)
		{
			var location = await locationRepository.GetAsync(id);
			
			if(location != null)
			{
				var response = new LocationRequest
				{
					Id = location.Id,
					Name = location.Name,
					City = location.City,
					Street = location.Street,
					Phone = location.Phone
				};
				return Ok(response);
			}
			return NotFound();
		}


		[HttpPut]
		public async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] EditLocationRequest editLocationRequest)
		{
            if (editLocationRequest == null)
            {
                return BadRequest("Invalid model data.");
            }

            var location = new Location
			{
				Id = id,
				Name = editLocationRequest.Name,
				City = editLocationRequest.City,
				Street = editLocationRequest.Street,
				Phone = editLocationRequest.Phone
			};

			var updatedLocation = await locationRepository.UpdateAsync(location);
			
			if(updatedLocation == null)
			{
				return NotFound();
			}

			var response = new LocationRequest
			{
				Id = location.Id,
				Name = location.Name,
				City = location.City,
				Street = location.Street,
				Phone = location.Phone
			};
			return Ok(response);
		}



		[HttpDelete]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
			var location = await locationRepository.DeleteAsync(id);

            if (location == null)
            {
                return NotFound();
            };

            var response = new AddLocationRequest
            {
                Id = location.Id,
                Name = location.Name,
				City = location.City,
				Street = location.Street,
				Phone=location.Phone
            };

            return Ok(response);

        }

    }
}
