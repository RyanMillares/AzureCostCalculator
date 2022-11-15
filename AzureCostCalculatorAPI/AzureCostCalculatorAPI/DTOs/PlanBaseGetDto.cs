namespace AzureCostCalculatorAPI.DTOs
{
    public class PlanBaseGetDto
    {
        public int CPU { get; set; }
        public int RAM { get; set; }
        public int Storage { get; set; }
        public int Cost { get; set; }
    }
}
