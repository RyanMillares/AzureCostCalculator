using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AzureCostCalculatorAPI.DTOs
{
    public class IaasApiPlanCreateDto
    {
        [Required]
        [MaxLength(7)]
        public string VM { get; set; } = string.Empty;

        [Required]
        [Range(1, 9999)]
        [DefaultValue(1)]
        public int CPU { get; set; }

        [Required]
        [Range(1, 9999)]
        [DefaultValue(1)]
        public int RAM { get; set; }

        [Required]
        [Range(1, 9999)]
        [DefaultValue(1)]
        public int Storage { get; set; }

        [Required]
        [Range(1, 9999)]
        [DefaultValue(1)]
        public int Cost { get; set; }
    }
}
