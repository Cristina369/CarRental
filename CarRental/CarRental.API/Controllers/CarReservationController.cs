using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;
using CarRental.API.Models.ViewModels;
using CarRental.API.Repositories.Implementation;
using CarRental.API.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Controllers
{
    public class CarReservationController : Controller
    {
        private readonly ICarReservationRepository carReservationRepository;
        private readonly ILocationRepository locationRepository;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly UserManager<IdentityUser> userManager;
        private readonly ICarRepository carRepository;
        private readonly IModelRepository modelRepository;
        private readonly IMakeRepository makeRepository;

        public CarReservationController(ICarReservationRepository carReservationRepository,
            ILocationRepository locationRepository,
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager,
            ICarRepository carRepository,
            IModelRepository modelRepository,
            IMakeRepository makeRepository
            )
        {
            this.carReservationRepository = carReservationRepository;
            this.locationRepository = locationRepository;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.carRepository = carRepository;
            this.modelRepository = modelRepository;
            this.makeRepository = makeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Add()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddReservationRequest addReservationRequest)
        {
            if (addReservationRequest == null)
            {
                return BadRequest("Invalid model data.");
            }

            var carReservation = new CarReservation
            {
                DateReservation = DateTime.Parse(addReservationRequest.DateReservation),
                PickUpDate = DateTime.Parse(addReservationRequest.PickUpDate),
                ReturnDate = DateTime.Parse(addReservationRequest.ReturnDate),
                Details = addReservationRequest.Details
            };

            if (!Guid.TryParse(addReservationRequest.SelectedCarId, out Guid selectedCarIdGuid))
            {
                return BadRequest("Invalid selected Car ID format.");
            }

            if (!Guid.TryParse(addReservationRequest.SelectedPickUpLocation, out Guid selectedPickUpIdGuid))
            {
                return BadRequest("Invalid selected PickUp Location ID format.");
            }

            if (!Guid.TryParse(addReservationRequest.SelectedReturnLocation, out Guid selectedReturnLocationIdGuid))
            {
                return BadRequest("Invalid selected Return Location ID format.");
            }

            var existingUser = await userManager.FindByEmailAsync(addReservationRequest.SelectedUser);
            if (existingUser == null)
            {
                return BadRequest("User with the provided email not found.");
            }

            var existingCar = await carRepository.GetAsync(selectedCarIdGuid);
            var existingPickUpLocation = await locationRepository.GetAsync(selectedPickUpIdGuid);
            var existingReturnLocation = await locationRepository.GetAsync(selectedReturnLocationIdGuid);

            if (existingCar != null && existingPickUpLocation != null && existingReturnLocation != null)
            {
                carReservation.UserId = new Guid(existingUser.Id);
                carReservation.CarId = existingCar.Id;
                carReservation.ReturnLocationId = existingReturnLocation.Id;
                carReservation.PickUpLocationId = existingPickUpLocation.Id;
            }
            else
            {
                return BadRequest("Selected Car or Locations not found.");
            }

            try
            {
                await carReservationRepository.AddAsync(carReservation);

                var response = new AddReservationRequest
                {
                    Id = carReservation.Id,
                    SelectedCarId = carReservation.CarId.ToString(),
                    SelectedUser = carReservation.UserId.ToString(),
                    DateReservation = carReservation.DateReservation.ToString("yyyy-MM-dd"),
                    PickUpDate = carReservation.PickUpDate.ToString("yyyy-MM-dd"),
                    ReturnDate = carReservation.ReturnDate.ToString("yyyy-MM-dd"),
                    Details = carReservation.Details,
                    SelectedPickUpLocation = carReservation.PickUpLocation.ToString(),
                    SelectedReturnLocation = carReservation.ReturnLocation.ToString()
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while adding the car.");
            }
        }

        [HttpGet]
        [ActionName("List")]
        public async Task<IActionResult> List()
        {
            var reservations = await carReservationRepository.GetAllAsync();

            var response = new List<ReservationRequest>();
            foreach (var reservation in reservations)
            {
                var user = await userManager.FindByIdAsync(reservation.UserId.ToString());
                var userName = user != null ? user.UserName : "Unknown";
                var userEmail = user != null ? user.Email : "Unknown";

                var car = await carRepository.GetAsync(reservation.CarId);
                var carModel = car != null ? car.Model : null;
                var carMake = carModel != null ? carModel.Make : null;
                var carMakeName = carMake != null ? carMake.Name : "Unknown";
                var carModelName = carModel != null ? carModel.Name : "Unknown";

                var pickUpLocation = await locationRepository.GetAsync(reservation.PickUpLocationId);
                var pickUpLocationName = pickUpLocation != null ? pickUpLocation.Name : "Unknown";

                var returnLocation = await locationRepository.GetAsync(reservation.ReturnLocationId);
                var returnLocationName = returnLocation != null ? returnLocation.Name : "Unknown";

                response.Add(new ReservationRequest
                {
                    Id = reservation.Id,
                    SelectedCarModel = $"{carMakeName} {carModelName}",
                    SelectedUserName = userName,
                    SelectedUserEmail = userEmail,
                    DateReservation = reservation.DateReservation.ToString(),
                    PickUpDate = reservation.PickUpDate.ToString(),
                    ReturnDate = reservation.ReturnDate.ToString(),
                    Details = reservation.Details,
                    PickUpLocationName = pickUpLocationName,
                    ReturnLocationName = returnLocationName
                });
            }
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetReservationByUser([FromQuery] string userEmail)
        {
            if (string.IsNullOrEmpty(userEmail))
            {
                return BadRequest("User email is required.");
            }

            var user = await userManager.FindByEmailAsync(userEmail.ToLower());
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (Guid.TryParse(user.Id, out Guid userIdGuid))
            {
                var reservations = await carReservationRepository.GetReservationsByUserIdAsync(userIdGuid);

                var response = new List<ReservationRequest>();
                foreach (var reservation in reservations)
                {
                    var car = await carRepository.GetAsync(reservation.CarId);
                    var carModel = car != null ? car.Model : null;
                    var carMake = carModel != null ? carModel.Make : null;
                    var carMakeName = carMake != null ? carMake.Name : "Unknown";
                    var carModelName = carModel != null ? carModel.Name : "Unknown";


                    var pickUpLocation = await locationRepository.GetAsync(reservation.PickUpLocationId);
                    var pickUpLocationName = pickUpLocation != null ? pickUpLocation.Name : "Unknown";

                    var returnLocation = await locationRepository.GetAsync(reservation.ReturnLocationId);
                    var returnLocationName = returnLocation != null ? returnLocation.Name : "Unknown";

                    response.Add(new ReservationRequest
                    {
                        Id = reservation.Id,
                        SelectedCarModel = $"{carMakeName} {carModelName}",
                        //SelectedUserName = user.UserName,
                        //SelectedUserEmail = userEmail,
                        DateReservation = reservation.DateReservation.ToString(),
                        PickUpDate = reservation.PickUpDate.ToString(),
                        ReturnDate = reservation.ReturnDate.ToString(),
                        Details = reservation.Details,
                        PickUpLocationName = pickUpLocationName,
                        ReturnLocationName = returnLocationName
                    });
                }

                return Ok(response);
            }
            else
            {
                return BadRequest("Invalid User Id");
            }
        }



        [HttpDelete]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedReservation = await carReservationRepository.DeleteAsync(id);

            if (deletedReservation == null)
            {
                return NotFound();
            }

            var response = new ReservationRequest
            {
                Id = deletedReservation.Id,
                DateReservation = deletedReservation.DateReservation.ToString(),
                PickUpDate = deletedReservation.PickUpDate.ToString(),
                ReturnDate = deletedReservation.ReturnDate.ToString(),
                Details = deletedReservation.Details,
                

            };

            return Ok(response);
        }
    }

    }
