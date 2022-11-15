using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using System.Data.SqlClient;

namespace AzureCostCalculatorAPI.Respositories;

public class IaasApiRepository : IIaasApiRepository
{
    private readonly string _connectionString;

    public IaasApiRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("SqlConnection");
    }

    // Returns a list of all the IaaS API plans
    public async Task<IEnumerable<IaasApiPlan>> GetIaasApiPlans()
    {
        using var conn = new SqlConnection(_connectionString);
        var data = await conn.QueryAsync<IaasApiPlan>("select * from IaaS_API");
        return data;
    }

    public async void CreateIaasApiPlan(IaasApiPlan plan)
    {
        if (plan is null)
        {
            throw new ArgumentNullException(nameof(plan));
        }

        var query = @"INSERT INTO dbo.IaaS_API (iaid, vm, cpu, ram, storage, cost)
                        VALUES (default, @vm, @cpu, @ram, @storage, @cost)";
        using var conn = new SqlConnection(_connectionString);
        await conn.QueryAsync<IaasApiPlan>(query, plan);
    }
}
