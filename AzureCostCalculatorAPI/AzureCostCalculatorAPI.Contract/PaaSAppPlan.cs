namespace AzureCostCalculatorAPI.Contract
{
    public class PaaSAppPlan : PlanBase
    {
        public Guid PAID { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
