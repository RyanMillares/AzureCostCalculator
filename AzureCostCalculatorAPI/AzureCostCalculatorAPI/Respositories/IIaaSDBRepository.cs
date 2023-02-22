using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IIaaSDBRepository
    {
        Task<IEnumerable<IaasDbPlan>> GetIaasDbPlans();
        void CreateIaasDbPlan(IaasDbPlan plan);
    }
}
