using AzureCostCalculatorAPI.Contract;

namespace AzureCostCalculatorAPI.Respositories
{
    public interface IIaaSAPIRepository
    {
        Task<List<IaaSAPIPlan>> GetIaaSAPIPlans();

    }
}
