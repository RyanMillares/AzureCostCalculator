namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class IaasDbPlan : PlanBase
    {
        public Guid IdId { get; set; }
        public string VM { get; set; } = string.Empty;
    }
}
