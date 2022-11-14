namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class PaasAppPlan : PlanBase
    {
        public Guid PaId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
