namespace AzureCostCalculatorAPI.DTOs
{
    public class PaasWebPlanGetDto : PlanBaseGetDto
    {
        public Guid PwId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
