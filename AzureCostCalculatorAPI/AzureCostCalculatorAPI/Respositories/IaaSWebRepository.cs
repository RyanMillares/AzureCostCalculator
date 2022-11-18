using AzureCostCalculatorAPI.Contract.Entities;
using AzureCostCalculatorAPI.Controllers;
using Dapper;
using Microsoft.Extensions.Hosting;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Intrinsics.Arm;

namespace AzureCostCalculatorAPI.Respositories;

public class IaaSWebRepository : IIaasWebRepository
{
    private readonly string _connectionString;

    public IaaSWebRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("SqlConnection");
    }

    public async Task<IEnumerable<IaasWebPlan>> GetIaasWebPlans()
    {
        var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

        using IDbConnection conn = new SqlConnection(myConnectorString);
        var IaaSWebData = await conn.QueryAsync<IaasWebPlan>("select * from IaaS_Web");
        return IaaSWebData.ToList();
    }

    // GetByName is returning null here unline the prior method.
    public async Task<IEnumerable<IaasWebPlan>> GetIaasWebPlan(Guid id)
    {
        var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

        using IDbConnection conn = new SqlConnection(myConnectorString);
        var IaaSWebData = await conn.QueryAsync<IaasWebPlan>("select * from IaaS_Web where iwid = @id", new { id });
        return IaaSWebData.ToList();
    }

    public async void CreateIaasWebPlan(IaasWebPlan plan)
    {
        if (plan is null)
        {
            throw new ArgumentNullException(nameof(plan));
        }

        var query = "INSERT INTO IaaS_Web (iwid, vm,cpu,ram,storage,cost) VALUES (default, @vm, @cpu, @ram, @storage, @cost)";

        using var conn = new SqlConnection(_connectionString);
        await conn.QueryAsync<IaasWebPlan>(query, plan);
    }

    public async void UpdateIaasWebPlan(IaasWebPlan plan)
    {
        if (plan is null)
        {
            throw new ArgumentNullException(nameof(plan)); 
        }

        var query = "UPDATE IaaS_Web SET vm = @vm, cpu = @cpu, ram = @ram, storage = @storage, cost = @cost WHERE iwid = @iwid";

        using var conn = new SqlConnection(_connectionString);
        await conn.QueryAsync<IaasWebPlan>(query, plan);
    }
}
