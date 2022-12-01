using AzureCostCalculatorAPI.Contract.Entities;
using AzureCostCalculatorAPI.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IServerSizeRepository
    {
        Task<IEnumerable<ServerSize>> GetServerSizes(bool sorted);
        Task<IEnumerable<ServerSize>> GetDistinctSizes();
        Task<IEnumerable<ServerSize>> GetServersBySize(string serverSize);
        void CreateServerSize(ServerSize newServerSize);
        void DeleteServerSize(Guid id);
    }
}
