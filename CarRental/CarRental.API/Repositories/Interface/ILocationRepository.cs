using CarRental.API.Models.Domain;

namespace CarRental.API.Repositories.Interface
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> GetAllAsync();
        Task<Location?> GetAsync(Guid id);
        Task<Location> AddAsync(Location location);
        Task<Location?> UpdateAsync(Location location);
        Task<Location?> DeleteAsync(Guid id);
    }
}
