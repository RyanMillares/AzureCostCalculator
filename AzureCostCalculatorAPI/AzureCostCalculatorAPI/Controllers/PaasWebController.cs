using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using static System.Data.IDbConnection;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaasWebController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the PaaS Website plans
        public async Task<List<PaasWebPlan>> GetPaaSWebPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var PaaSWebData = await conn.QueryAsync<PaasWebPlan>("select * from PaaS_Web");
            return PaaSWebData.ToList();
        }

        [HttpGet("{id}")]
        // Returns the IaaS web plan associated with the given GUID
        public async Task<PaasWebPlan> Get(Guid id)
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var plan = await conn.QuerySingleAsync<PaasWebPlan>("select * from PaaS_Web where pwid = @id", new { id });
            return plan;
        }
        [HttpPost]
        //public async Task<IActionResult> Post(Guid pwid, String name, int cpu, int ram, int storage, int cost)

        public async Task<IActionResult> Post(string name, int cpu, int ram, int storage, int cost)
        {
            PaasWebPlan plan = new PaasWebPlan();
            plan.PwId = Guid.NewGuid();
            plan.Name = name;
            plan.CPU = cpu;
            plan.RAM = ram;
            plan.Storage = storage;
            plan.Cost = cost;
            String query = "INSERT INTO PaaS_Web (pwid, name,cpu,ram,storage,cost) VALUES (default, @name, @cpu, @ram, @storage, @cost)";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<PaasWebPlan>(query, plan);

            }
 
            return Ok();

        }
        [HttpPut]
        public async Task<IActionResult> Put(PaasWebPlan plan)
        {
            string query = "UPDATE PaaS_Web SET name = @name, cpu = @cpu, ram = @ram, storage = @storage, cost = @cost WHERE pwid = @pwid";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<PaasWebPlan>(query, plan);

            }
            return Ok();
        }
    }
}
