namespace AzureCostCalculatorAPI.DTOs
{
    public class IaasApiPlanGetDto : PlanBaseGetDto
    {
        public Guid IaId { get; set; }
        public string VM { get; set; } = string.Empty;
    }
}
