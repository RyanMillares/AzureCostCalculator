using AzureCostCalculatorAPI.Contract;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace AzureCostCalculatorAPI.Respositories;

public class IaaSAPIRepository : IIaaSAPIRepository
{
    // Returns a list of all the IaaS API plans
    public async Task<List<IaaSAPIPlan>> GetIaaSAPIPlans()
    {
        using IDbConnection conn = new SqlConnection("Server=.\\sqlexpress;Trusted_Connection=True;Database=AzureResources;TrustServerCertificate=True;");
        var IaaSAPIData = await conn.QueryAsync<IaaSAPIPlan>("select * from IaaS_API");
        return IaaSAPIData.ToList();
    }
}
