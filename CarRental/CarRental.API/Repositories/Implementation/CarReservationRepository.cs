using CarRental.API.Data;
using CarRental.API.Models.Domain;
using CarRental.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Repositories.Implementation
{
    public class CarReservationRepository : ICarReservationRepository
    {
        private readonly CarRentalDbContext carRentalDbContext;

        public CarReservationRepository(CarRentalDbContext carRentalDbContext)
        {
            this.carRentalDbContext = carRentalDbContext;
        }

        public async Task<CarReservation> AddAsync(CarReservation carReservation)
        {
            await carRentalDbContext.Reservations.AddAsync(carReservation);
            await carRentalDbContext.SaveChangesAsync();
            return carReservation;
        }

        public async Task<CarReservation> AddReservationForCar(CarReservation carReservation)
        {
            await carRentalDbContext.Reservations.AddAsync(carReservation);
            await carRentalDbContext.SaveChangesAsync();
            return carReservation;
        }


        public async Task<IEnumerable<CarReservation>> GetAllAsync()
        {
            return await carRentalDbContext.Reservations
                           .Include(c => c.Car) 
                           .Include(c => c.PickUpLocation)
                           .Include(c => c.ReturnLocation)
                           .ToListAsync();
        }


        public async Task<IEnumerable<CarReservation>> GetReservationsByCarIdAsync(Guid carId)
        {
            return await carRentalDbContext.Reservations
                .Where(r => r.CarId == carId).ToListAsync();
        }

        public async Task<int> GetTotalReservations(Guid carId)
        {
            return await carRentalDbContext.Reservations.CountAsync(r => r.CarId == carId);
        }


        public Task<CarReservation?> UpdateAsync(CarReservation carReservation)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<CarReservation>> GetReservationsByUserIdAsync(Guid userId)
        {
            return await carRentalDbContext.Reservations
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }

        public async Task<CarReservation?> DeleteAsync(Guid id)
        {
            var existingReservation = await carRentalDbContext.Reservations.FindAsync(id);

            if (existingReservation != null)
            {
                carRentalDbContext.Reservations.Remove(existingReservation);
                await carRentalDbContext.SaveChangesAsync();

                return existingReservation;
            }
            return null;
        }

        Task<CarReservation?> ICarReservationRepository.GetAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
