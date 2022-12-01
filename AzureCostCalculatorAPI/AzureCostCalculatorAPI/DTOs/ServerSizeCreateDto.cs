using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AzureCostCalculatorAPI.DTOs
{
    public class ServerSizeCreateDto
    {
        [Required]
        [MaxLength(6)]
        public string Size { get; set; } = string.Empty;

        [Required]
        [Range(1, 9999)]
        [DefaultValue(1)]
        public int Servers { get; set; }
    }
}
