using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Respositories;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class IaaSAPIController : ControllerBase
{
    
    public IaaSAPIController(IIaaSAPIRepository repo)
    {
        this.repo = repo;
    }

    private IIaaSAPIRepository repo;

    [HttpGet]
    // Returns a list of all the IaaS API plans
    public async Task<List<IaaSAPIPlan>> GetIaaSAPIPlan()
    {
        return await repo.GetIaaSAPIPlans();
    }
    [HttpPost]
    public async Task<IActionResult> Post(IaaSAPIPlan plan)
    {

        String query = "INSERT INTO IaaS_API (iaid, vm,cpu,ram,storage,cost) VALUES (default, @vm, @cpu, @ram, @storage, @cost)";

        var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
        using (var conn = new SqlConnection(myConnectorString))
        {
            await conn.OpenAsync();
            var affectedRows = await conn.QueryAsync<IaaSAPIPlan>(query, plan);

        }

        return Ok();

    }
}
