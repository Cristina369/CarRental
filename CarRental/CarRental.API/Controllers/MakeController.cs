using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;
using CarRental.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    //[Authorize(Roles = "SuperAdmin")]
    public class MakeController : Controller
	{
		private readonly IMakeRepository makeRepository;

		public MakeController(IMakeRepository makeRepository)
        {
			this.makeRepository = makeRepository;
		}

		[HttpGet]
        public IActionResult Add()
		{
			return View();
		}

		[HttpPost]
		[ActionName("Add")]
		public async Task<IActionResult> Add([FromBody] AddMakeRequest addMakeRequest)
		{
			var make = new Make
			{
				Name = addMakeRequest.Name
			};

			await makeRepository.AddAsync(make);

			var response = new AddMakeRequest
			{
				Id = make.Id,
				Name = make.Name
			};


			return Ok(response);// return View();
		}

		[HttpGet]
		[ActionName("List")]
		public async Task<IActionResult> List()
		{
			var makes = await makeRepository.GetAllAsync();

            var response = new List<AddMakeRequest>();
            foreach (var make in makes)
            {
                response.Add(new AddMakeRequest
                {
                    Id = make.Id,
                    Name = make.Name
                });
            }
            return Ok(response);// return View(makes);
		}


		[HttpDelete]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
            var make = await makeRepository.DeleteAsync(id);

            if (make == null)
            {
                return NotFound();
            };

            var response = new AddMakeRequest
            {
                Id = make.Id,
                Name = make.Name
            };

			return Ok(response);

        }
	}
}
