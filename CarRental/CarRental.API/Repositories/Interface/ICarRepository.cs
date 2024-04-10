using CarRental.API.Models.Domain;
using CarRental.API.Models.DTO;

namespace CarRental.API.Repositories.Interface
{
    public interface ICarRepository
    {
        Task<IEnumerable<Car>> GetAllAsync();
        Task<Car?> GetAsync(Guid id);
        Task<Car> AddAsync(Car car);
        Task<Car?> UpdateAsync(Car car);
        Task<Car?> DeleteAsync(Guid id);
        Task<List<Car>> GetAvailableCarsAsync(string pickupDate, string returnDate, Guid pickupLocation, Guid returnLocation);
        Task<List<Car>> GetCarsByModelIdAsync(Guid id);

        Task<List<Car>> GetCarsByTypeAsync(string type);

        Task<List<string>> GetCarTypesAsync();

    }
}
