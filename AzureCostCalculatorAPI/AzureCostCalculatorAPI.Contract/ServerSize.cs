namespace AzureCostCalculatorAPI.Contract
{
    public class ServerSize
    {
        public Guid SSid { get; set; }
        public string Size { get; set; } = string.Empty;
        public int Servers { get; set; }
    }
}
