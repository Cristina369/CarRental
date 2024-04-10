using CarRental.API.Data;
using CarRental.API.Models.Domain;
using CarRental.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Repositories.Implementation
{
    public class MakeRepository : IMakeRepository
    {
        private readonly CarRentalDbContext carRentalDbContext;

        public MakeRepository(CarRentalDbContext carRentalDbContext)
        {
            this.carRentalDbContext = carRentalDbContext;
        }
        public async Task<Make> AddAsync(Make make)
        {
            await carRentalDbContext.AddAsync(make);
            await carRentalDbContext.SaveChangesAsync();
            return make;
        }

        public async Task<Make?> DeleteAsync(Guid id)
        {
            var exitingMake = await carRentalDbContext.Makes.FindAsync(id);

            if (exitingMake != null)
            {
                carRentalDbContext.Makes.Remove(exitingMake);
                await carRentalDbContext.SaveChangesAsync();
                return exitingMake;
            }
            return null;
        }

        public async Task<IEnumerable<Make>> GetAllAsync()
        {
            return await carRentalDbContext.Makes.ToListAsync();
        }

        public async Task<Make?> GetAsync(Guid id)
        {
            return await carRentalDbContext.Makes.FirstAsync(m => m.Id == id);
        }

    }
}
