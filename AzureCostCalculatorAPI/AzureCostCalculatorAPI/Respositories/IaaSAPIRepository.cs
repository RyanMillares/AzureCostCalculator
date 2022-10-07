using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Controllers;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace AzureCostCalculatorAPI.Respositories;

public class IaaSAPIRepository : IIaaSAPIRepository
{
    // Returns a list of all the IaaS API plans
    public async Task<List<IaaSAPIPlan>> GetIaaSAPIPlans()
    {
        var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
        using IDbConnection conn = new SqlConnection(myConnectorString);
        var IaaSAPIData = await conn.QueryAsync<IaaSAPIPlan>("select * from IaaS_API");
        return IaaSAPIData.ToList();
    }
}
