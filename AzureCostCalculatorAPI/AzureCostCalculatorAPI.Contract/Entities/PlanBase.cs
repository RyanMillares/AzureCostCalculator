namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class PlanBase
    {
        public int CPU { get; set; }
        public int RAM { get; set; }
        public int Storage { get; set; }
        public int Cost { get; set; }
    }
}
