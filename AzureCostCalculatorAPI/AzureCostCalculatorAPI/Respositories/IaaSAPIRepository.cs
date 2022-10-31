using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Controllers;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Intrinsics.Arm;

namespace AzureCostCalculatorAPI.Respositories;

public class IaaSAPIRepository : IIaaSAPIRepository
{
    private readonly string _connectionString;
    private readonly ILogger<IaaSAPIRepository> _logger;

    public IaaSAPIRepository(IConfiguration config, ILogger<IaaSAPIRepository> logger)
    {
        _connectionString = config.GetConnectionString("SqlConnection");
        _logger = logger;
    }

    // Returns a list of all the IaaS API plans
    public async Task<List<IaaSAPIPlan>> GetAllIaaSApiPlans()
    {
        try
        {
            using var conn = new SqlConnection(_connectionString);
            var IaaSAPIData = await conn.QueryAsync<IaaSAPIPlan>("select * from IaaS_API");
            return IaaSAPIData.ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TODO: Say something useful.");
            throw;
        }
    }

    public async void CreateIaaSApiPlan([FromBody] IaaSAPIPlan plan)
    {
        if (plan is null)
        {
            throw new ArgumentNullException(nameof(plan));
        }

        try
        {
            var query = @"INSERT INTO dbo.IaaS_API (iaid, vm, cpu, ram, storage, cost)
                          VALUES (default, @vm, @cpu, @ram, @storage, @cost)";
            using var conn = new SqlConnection(_connectionString);
            await conn.QueryAsync<IaaSAPIPlan>(query, plan);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TODO: Say something useful.");
            throw;
        }
    }
}
