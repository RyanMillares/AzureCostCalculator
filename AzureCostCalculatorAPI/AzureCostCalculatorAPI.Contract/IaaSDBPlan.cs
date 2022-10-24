namespace AzureCostCalculatorAPI.Contract
{
    public class IaaSDBPlan : PlanBase
    {
        public Guid IDID { get; set; }
        public string VM { get; set; } = string.Empty;
    }
}
