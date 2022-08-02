namespace AzureCostCalculatorAPI.Contract
{
    public class IaaSWebPlan
    {
        public Guid IWID { get; set; }
        public string? VM { get; set; }
        public int? CPU { get; set; }
        public int? RAM { get; set; }
        public int? Storage { get; set; }
        public int? Cost { get; set; }

    }
}
