namespace AzureCostCalculatorAPI.Contract
{
    public class IaaSWebPlan : PlanBase
    {
        public Guid IWID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string VM { get; set; } = string.Empty;
    }
}
