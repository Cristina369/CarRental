using CarRental.API.Data;
using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;
using CarRental.API.Models.ViewModels;
using CarRental.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Repositories.Implementation
{
    public class CarRepository : ICarRepository
    {
        private readonly CarRentalDbContext carRentalDbContext;

        public CarRepository(CarRentalDbContext carRentalDbContext)
        {
            this.carRentalDbContext = carRentalDbContext;
        }

        public async Task<Car> AddAsync(Car car)
        {
            await carRentalDbContext.AddAsync(car);
            await carRentalDbContext.SaveChangesAsync();
            return car;
        }

        public async Task<Car?> DeleteAsync(Guid id)
        {
            var exitingCar = await carRentalDbContext.Cars.FindAsync(id);

            if (exitingCar != null)
            {
                carRentalDbContext.Cars.Remove(exitingCar);
                await carRentalDbContext.SaveChangesAsync();
                return exitingCar;
            }

            return null;
        }

        public async Task<IEnumerable<Car>> GetAllAsync()
        {
            return await carRentalDbContext.Cars.Include(c => c.Model).Include(c => c.Location).ToListAsync();
        }

        public async Task<Car?> GetAsync(Guid id)
        {
            return await carRentalDbContext.Cars
                 .Include(c => c.Model)
                .Include(c => c.Location)
                .FirstAsync(c => c.Id == id);
        }

        public async Task<List<Car>> GetAvailableCarsAsync(string pickupDate, string returnDate, Guid pickupLocation, Guid returnLocation)
        {
            var cars = await carRentalDbContext.Cars.Include(c => c.Model).Include(c => c.Location).Include(c => c.Reservations).ToListAsync();

            var availableCars = cars.Where(car =>
                car.Available &&
                car.Reservations.All(reservation =>
                    !(DateTime.Parse(pickupDate) <= reservation.ReturnDate && DateTime.Parse(returnDate) >= reservation.PickUpDate) &&
                    !(pickupLocation == reservation.ReturnLocationId || returnLocation == reservation.PickUpLocationId)
                )
            ).ToList();


            return availableCars;
        }


        public async Task<List<Car>> GetCarsByModelIdAsync(Guid id)
        {
            return await carRentalDbContext.Cars
                .Where(r => r.ModelId == id).ToListAsync();
        }

        public async Task<List<Car>> GetCarsByTypeAsync(string type)
        {
            return await carRentalDbContext.Cars
                .Where(car => car.Type.ToLower() == type.ToLower())
                .ToListAsync();
        }


        public async Task<List<string>> GetCarTypesAsync()
        {
            return await carRentalDbContext.Cars
                .Select(car => car.Type)
                .Distinct()
                .ToListAsync();
        }

        public async Task<Car?> UpdateAsync(Car car)
        {
            var exitingCar = await carRentalDbContext.Cars
                .Include(m => m.Model)
                .Include(l => l.Location)
                .FirstOrDefaultAsync(c => c.Id == car.Id);

            if (exitingCar != null)
            {
                exitingCar.Id = car.Id;
                exitingCar.Price = car.Price;
                exitingCar.Year = car.Year;
                exitingCar.Type = car.Type;
                exitingCar.Description = car.Description;
                exitingCar.ImageCar = car.ImageCar;
                exitingCar.Available = car.Available;
                exitingCar.ModelId = car.ModelId;
                exitingCar.LocationId = car.LocationId;

                await carRentalDbContext.SaveChangesAsync();
                await carRentalDbContext.SaveChangesAsync();
                return exitingCar;
            }
            return null;
        }
    }
}
