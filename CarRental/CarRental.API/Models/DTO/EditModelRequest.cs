using Microsoft.AspNetCore.Mvc.Rendering;

namespace CarRental.API.Models.DTO
{
    public class EditModelRequest
    {
        // public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IEnumerable<SelectListItem> Makes { get; set; }
        public string MakeId { get; set; }
    }
}
