using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IIaasWebRepository
    {
        Task<IEnumerable<IaasWebPlan>> GetIaasWebPlans();
        Task<IEnumerable<IaasWebPlan>> GetIaasWebPlan(Guid id);
        void CreateIaasWebPlan(IaasWebPlan plan);
        void UpdateIaasWebPlan(IaasWebPlan plan);
    }
}
