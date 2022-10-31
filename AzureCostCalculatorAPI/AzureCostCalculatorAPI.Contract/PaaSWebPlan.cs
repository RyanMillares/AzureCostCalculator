namespace AzureCostCalculatorAPI.Contract
{
    public class PaaSWebPlan : PlanBase
    {
        public Guid PWID { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
