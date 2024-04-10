using CarRental.API.Models.Domain;

namespace CarRental.API.Repositories.Interface
{
    public interface IImageRepository
    {
        Task<string> UploadAsync(IFormFile file, string title);

        Task<List<string>> GetAllImagesAsync();
        // Task<CarImage> Upload(IFormFile file, CarImage carImage);
    }
}
