namespace AzureCostCalculatorAPI.Contract
{
    public class IaaSAPIPlan : PlanBase
    {
        public Guid IAID { get; set; }
        public string VM { get; set; } = string.Empty;        
    }
}
