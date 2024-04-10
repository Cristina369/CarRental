using CarRental.API.Data;
using CarRental.API.Models.Domain;
using CarRental.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Repositories.Implementation
{
    public class ModelRepository : IModelRepository
    {
        private readonly CarRentalDbContext carRentalDbContext;

        public ModelRepository(CarRentalDbContext carRentalDbContext)
        {
            this.carRentalDbContext = carRentalDbContext;
        }
        public async Task<Model> AddAsync(Model model)
        {
            await carRentalDbContext.Models.AddAsync(model);
            await carRentalDbContext.SaveChangesAsync();

            return model;
        }

        public async Task<Model?> DeleteAsync(Guid id)
        {
            var existingModel = await carRentalDbContext.Models.FindAsync(id);

            if (existingModel != null)
            {
                carRentalDbContext.Models.Remove(existingModel);
                await carRentalDbContext.SaveChangesAsync();

                return existingModel;
            }
            return null;
        }

        public async Task<IEnumerable<Model>> GetAllAsync()
        {
            return await carRentalDbContext.Models.Include(c => c.Make).ToListAsync();
        }

        public Task<Model?> GetAsync(Guid id)
        {
            return carRentalDbContext.Models.Include(c => c.Make).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Model?> UpdateAsync(Model model)
        {
            var existingModel = await carRentalDbContext.Models.Include(c => c.Make)
                .FirstOrDefaultAsync(c => c.Id == model.Id);

            if (existingModel != null)
            {
                existingModel.Name = model.Name;
                existingModel.Description = model.Description;
                existingModel.MakeId = model.MakeId;

                await carRentalDbContext.SaveChangesAsync();

                return existingModel;
            }

            return null;
        }
    }
}
