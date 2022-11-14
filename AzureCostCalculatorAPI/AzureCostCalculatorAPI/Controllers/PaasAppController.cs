using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaasAppController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the PaaS AppService plans
        public async Task<List<PaasAppPlan>> GetPaaSAPIPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var PaaSAPIData = await conn.QueryAsync<PaasAppPlan>("select * from PaaS_AS");
            return PaaSAPIData.ToList();
        }
        [HttpPost]
        public async Task<IActionResult> Post(string name, int cpu, int ram, int storage, int cost)
        {
            PaasAppPlan plan = new PaasAppPlan();
            plan.PaId = Guid.NewGuid();
            plan.Name = name;
            plan.CPU = cpu;
            plan.RAM = ram;
            plan.Storage = storage;
            plan.Cost = cost;
            String query = "INSERT INTO PaaS_AS (paid, name,cpu,ram,storage,cost) VALUES (default, @name, @cpu, @ram, @storage, @cost)";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<PaasAppPlan>(query, plan);

            }

            return Ok();

        }
        [HttpPut]
        public async Task<IActionResult> Put(PaasAppPlan plan)
        {

            string query = "UPDATE PaaS_AS SET name = @name, cpu = @cpu, ram = @ram, storage = @storage, cost = @cost WHERE paid = @paid";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<PaasAppPlan>(query, plan);

            }
            return Ok();
        }
    }
}
