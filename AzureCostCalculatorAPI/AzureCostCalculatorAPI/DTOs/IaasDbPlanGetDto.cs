namespace AzureCostCalculatorAPI.DTOs
{
    public class IaasDbPlanGetDto : PlanBaseGetDto
    {
        public Guid IdId { get; set; }
        public string VM { get; set; } = string.Empty;
    }
}
