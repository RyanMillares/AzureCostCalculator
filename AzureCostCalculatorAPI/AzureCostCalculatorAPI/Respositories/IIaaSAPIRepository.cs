using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IIaasApiRepository
    {
        Task<IEnumerable<IaasApiPlan>> GetIaasApiPlans();
        void CreateIaasApiPlan(IaasApiPlan plan);
    }
}
