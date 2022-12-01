namespace AzureCostCalculatorAPI.DTOs
{
    public class IaasWebPlanGetDto : PlanBaseGetDto
    {
        public Guid IaId { get; set; }
        public string VM { get; set; } = string.Empty;
    }
}
