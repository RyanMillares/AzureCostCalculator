namespace AzureCostCalculatorAPI.Contract.Entities
{
    public class ServerSize
    {
        public Guid SsId { get; set; }
        public string Size { get; set; } = string.Empty;
        public int Servers { get; set; }
    }
}
