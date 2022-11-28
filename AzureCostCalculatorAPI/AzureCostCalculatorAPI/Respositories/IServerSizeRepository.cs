using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IServerSizeRepository
    {
        Task<IEnumerable<ServerSize>> GetServerSizes();
        Task<IEnumerable<ServerSize>> GetSorted();
        Task<IEnumerable<ServerSize>> GetDistinctSize();
        Task<IEnumerable<ServerSize>> GetServerBySize(string serverSize);
        void CreateServerSize(ServerSize newServerSize);
    }
}
