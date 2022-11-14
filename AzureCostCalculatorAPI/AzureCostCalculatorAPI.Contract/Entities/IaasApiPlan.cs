namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class IaasApiPlan : PlanBase
    {
        public Guid IaId { get; set; }
        public string VM { get; set; } = string.Empty;
    }
}
