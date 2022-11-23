using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IServerSizeRepository
    {
        Task<IEnumerable<ServerSize>> GetServerSizes();
        void CreateServerSize(ServerSize newServerSize);
        Task<IEnumerable<ServerSize>> GetSorted();
        Task<IEnumerable<ServerSize>> GetDistinctSize();
    }
}
