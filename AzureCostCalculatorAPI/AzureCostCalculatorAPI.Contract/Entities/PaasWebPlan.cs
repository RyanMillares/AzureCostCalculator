namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class PaasWebPlan : PlanBase
    {
        public Guid PwId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
