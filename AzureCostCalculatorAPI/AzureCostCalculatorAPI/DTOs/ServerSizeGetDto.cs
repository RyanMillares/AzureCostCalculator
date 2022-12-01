namespace AzureCostCalculatorAPI.DTOs
{
    public class ServerSizeGetDto
    {
        public Guid SsId{ get; set; }
        public string Size { get; set; } = string.Empty;
        public int Servers { get; set;}
    }
}
