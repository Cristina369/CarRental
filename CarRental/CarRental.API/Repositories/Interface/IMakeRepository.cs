using CarRental.API.Models.Domain;

namespace CarRental.API.Repositories.Interface
{
    public interface IMakeRepository
    {
        Task<IEnumerable<Make>> GetAllAsync();
        Task<Make?> GetAsync(Guid id);
        Task<Make> AddAsync(Make make);
        Task<Make?> DeleteAsync(Guid id);
    }
}
