using CarRental.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Data
{
	public class CarRentalDbContext : DbContext
	{
		public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options) : base(options)
		{
            this.Database.SetCommandTimeout(180);
        }

		public DbSet<Car> Cars { get; set; }
		public DbSet<Model> Models { get; set; }
		public DbSet<Make> Makes { get; set; }
		public DbSet<Location> Locations { get; set; }	
		public DbSet<CarImage> CarImages { get; set; }
		public DbSet<CarReservation> Reservations { get; set; }
	}
}
