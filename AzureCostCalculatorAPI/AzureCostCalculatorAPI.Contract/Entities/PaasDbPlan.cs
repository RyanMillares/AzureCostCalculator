namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class PaasDbPlan
    {
        public Guid PdId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Hardware { get; set; } = string.Empty;
        public string Storage { get; set; } = string.Empty;
        public string Instance { get; set; } = string.Empty;
        public int Cost { get; set; }
    }
}
