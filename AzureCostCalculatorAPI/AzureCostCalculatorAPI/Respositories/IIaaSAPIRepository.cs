using AzureCostCalculatorAPI.Contract;
using Microsoft.AspNetCore.Mvc;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IIaaSAPIRepository
    {
        Task<List<IaaSAPIPlan>> GetAllIaaSApiPlans();
        void CreateIaaSApiPlan([FromBody] IaaSAPIPlan plan);
    }
}
