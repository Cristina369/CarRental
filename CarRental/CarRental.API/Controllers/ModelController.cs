using CarRental.API.Data;
using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;
using CarRental.API.Repositories.Interface;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Controllers
{
    // [Authorize(Roles = "Admin")]
    public class ModelController : Controller
	{
		private readonly IModelRepository modelRepository;
		private readonly IMakeRepository makeRepository;
        private readonly ICarRepository carRepository;

        public ModelController(IModelRepository modelRepository, IMakeRepository makeRepository, ICarRepository carRepository)
        {
			this.modelRepository = modelRepository;
			this.makeRepository = makeRepository;
            this.carRepository = carRepository;
        }

        [HttpGet]
		public async Task<IActionResult> Add()
		{
			return Ok();
		}

		[HttpPost]
        public async Task<IActionResult> Add([FromBody] AddModelRequest addModelRequest)
        {
            if (addModelRequest == null)
            {
                return BadRequest("Invalid model data.");
            }

            var model = new Model
            {
                Name = addModelRequest.Name,
                Description = addModelRequest.Description
            };

            if (!Guid.TryParse(addModelRequest.SelectedMake, out Guid selectedMakeIdGuid))
            {
                return BadRequest("Invalid selected make ID format.");
            }

            var existingMake = await makeRepository.GetAsync(selectedMakeIdGuid);

            if (existingMake != null)
            {
                model.MakeId = existingMake.Id;
            }
            else
            {
                return BadRequest("Selected make not found.");
            }

            try
            {
                await modelRepository.AddAsync(model);

                var response = new AddModelRequest
                {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description,
                    SelectedMake = model.MakeId.ToString()
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while adding the model.");
            }
        }

        [HttpGet]
		[ActionName("List")]
		public async Task<IActionResult> List()
		{
			var models = await modelRepository.GetAllAsync();
            var makeDM = await makeRepository.GetAllAsync();


            var response = new List<ModelRequest>();
            foreach (var model in models)
            {
                var make = makeDM.FirstOrDefault(m => m.Id == model.MakeId);
                var makeName = make != null ? make.Name : "Unknown";

                var carCount = await carRepository.GetCarsByModelIdAsync(model.Id);

                response.Add(new ModelRequest
                {
                    Id = model.Id,
                    Name = model.Name,
					Description = model.Description,
                    MakeId = model.MakeId,
					MakeName = makeName,
                    CarCount = carCount.Count()
                });
            }
            return Ok(response);// return View(models);
        }

		[HttpGet]
		public async Task<IActionResult> Edit([FromRoute] Guid id)
		{
            var model = await modelRepository.GetAsync(id);
            var makeDM = await makeRepository.GetAllAsync();

            if (model != null)
            {
                var response = new ModelRequest
                {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description,
                    MakeId = model.MakeId
                };
                return Ok(response);
            }
            return NotFound();
        }

		[HttpPut]
        public async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] EditModelRequest editModelRequest)
		{

            if (editModelRequest == null)
            {
                return BadRequest("Invalid model data.");
            }


            var model = new Model
            {
                Id = id,
                Name = editModelRequest.Name,
                Description = editModelRequest.Description
            };

            var selectedMakeIdGuid = Guid.Parse(editModelRequest.MakeId);
            var existingMake = await makeRepository.GetAsync(selectedMakeIdGuid);


            if (existingMake != null)
            {
                model.MakeId = existingMake.Id;
            }

            var updatedModel = await modelRepository.UpdateAsync(model);

            if (updatedModel == null)
            {
                return NotFound();
            }

            var response = new ModelRequest
			{
				Id = model.Id,
				Name = model.Name,
				Description = model.Description,
				MakeId = model.MakeId
			};

			return Ok(response);
		}

        [HttpDelete]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedModel = await modelRepository.DeleteAsync(id);

            if (deletedModel == null)
            {
                return NotFound();
            }

            var response = new ModelRequest
            {
                Id = deletedModel.Id,
                Name = deletedModel.Name,
                Description = deletedModel.Description,
                MakeId = deletedModel.MakeId

            };

            return Ok(response);
        }
    }
}
