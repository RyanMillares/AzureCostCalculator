using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IPaasWebRepository
    {
        Task<IEnumerable<PaasWebPlan>> GetPaasWebPlans();
        void CreatePaasWebPlan(PaasWebPlan plan);
    }
}
