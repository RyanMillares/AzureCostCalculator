using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AzureCostCalculatorAPI.DTOs
{
    public class PaasWebPlanCreateDTO
    {

        //MaxLength chosen as 13 since its the maximum amount of characters found in the dummy data
        [Required]
        [MaxLength(13)]
        public string Name { get; set; } = string.Empty;

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
