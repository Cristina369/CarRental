using CarRental.API.Models.Domain;

namespace CarRental.API.Repositories.Interface
{
    public interface IModelRepository
    {
        Task<IEnumerable<Model>> GetAllAsync();
        Task<Model?> GetAsync(Guid id);
        Task<Model> AddAsync(Model model);
        Task<Model?> UpdateAsync(Model model);
        Task<Model?> DeleteAsync(Guid id);

    }
}
