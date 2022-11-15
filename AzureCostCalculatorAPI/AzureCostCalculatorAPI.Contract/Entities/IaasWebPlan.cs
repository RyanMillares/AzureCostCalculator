namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class IaasWebPlan : PlanBase
    {
        public Guid IwId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string VM { get; set; } = string.Empty;
    }
}
