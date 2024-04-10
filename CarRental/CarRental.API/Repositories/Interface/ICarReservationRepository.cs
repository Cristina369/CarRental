using CarRental.API.Models.Domain;

namespace CarRental.API.Repositories.Interface
{
    public interface ICarReservationRepository
    {
        Task<IEnumerable<CarReservation>> GetAllAsync();
        Task<CarReservation?> GetAsync(Guid id);
        Task<CarReservation> AddAsync(CarReservation carReservation);
        Task<CarReservation?> UpdateAsync(CarReservation carReservation);
        Task<CarReservation?> DeleteAsync(Guid id);
        Task<CarReservation> AddReservationForCar(CarReservation carReservation);
        Task<IEnumerable<CarReservation>> GetReservationsByCarIdAsync(Guid carReservationId);
        Task<IEnumerable<CarReservation>> GetReservationsByUserIdAsync(Guid userId);
    }
}
