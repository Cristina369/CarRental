using CarRental.API.Data;
using CarRental.API.Models.Domain;
using CarRental.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Repositories.Implementation
{
    public class LocationRepository : ILocationRepository
    {
        private readonly CarRentalDbContext carRentalDbContext;

        public LocationRepository(CarRentalDbContext carRentalDbContext)
        {
            this.carRentalDbContext = carRentalDbContext;
        }
        public async Task<Location> AddAsync(Location location)
        {
            await carRentalDbContext.AddAsync(location);
            await carRentalDbContext.SaveChangesAsync();

            return location;
        }

        public async Task<Location?> DeleteAsync(Guid id)
        {
            var existingLocation = await carRentalDbContext.Locations.FindAsync(id);

            if (existingLocation != null)
            {
                carRentalDbContext.Locations.Remove(existingLocation);
                await carRentalDbContext.SaveChangesAsync();

                return existingLocation;
            }
            return null;
        }

        public async Task<IEnumerable<Location>> GetAllAsync()
        {
            return await carRentalDbContext.Locations.ToListAsync();
        }

        public async Task<Location?> GetAsync(Guid id)
        {
            return await carRentalDbContext.Locations.FirstAsync(l => l.Id == id);
        }

        public async Task<Location?> UpdateAsync(Location location)
        {
            var existingLocation = await carRentalDbContext.Locations.FirstOrDefaultAsync(l => l.Id == location.Id);

            if (existingLocation != null)
            {
                existingLocation.Name = location.Name;
                existingLocation.City = location.City;
                existingLocation.Street = location.Street;
                existingLocation.Phone = location.Phone;

                await carRentalDbContext.SaveChangesAsync();
                return existingLocation;
            }

            return null;
        }
    }
}
