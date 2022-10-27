using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using AzureCostCalculatorAPI.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IaaSWebController : ControllerBase
    {
        // GET: api/<DatabaseController>
        [HttpGet]
        // Returns a list of all the IaaS Web plans
        public async Task<List<IaaSWebPlan>> GetIaaSWebPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var IaaSWebData = await conn.QueryAsync<IaaSWebPlan>("select * from IaaS_Web");
            return IaaSWebData.ToList();
        }

        [HttpGet("{id}")]
        // Returns the IaaS web plan associated with the given GUID
        public async Task<IaaSWebPlan> Get(Guid id)
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var plan = await conn.QuerySingleAsync<IaaSWebPlan>("select * from IaaS_Web where iwid = @id", new { id });
            return plan;
        }
        [HttpPost]
        public async Task<IActionResult> Post(string vm, int cpu, int ram, int storage, int cost)
        {
            /**
            PaaSWebPlan plan = new PaaSWebPlan();
            plan.PWID = Guid.NewGuid();
            plan.Name = name;
            plan.CPU = cpu;
            plan.RAM = ram;
            plan.Storage = storage;
            plan.Cost = cost;
            **/

            IaaSWebPlan plan = new IaaSWebPlan();
            plan.IWID = Guid.NewGuid();
            plan.VM = vm;
            plan.CPU = cpu;
            plan.RAM = ram;
            plan.Storage = storage;
            plan.Cost = cost;
            String query = "INSERT INTO IaaS_Web (iwid, vm,cpu,ram,storage,cost) VALUES (default, @vm, @cpu, @ram, @storage, @cost)";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<IaaSWebPlan>(query, plan);

            }

            return Ok();

        }
        [HttpPut]
        public async Task<IActionResult> Put(IaaSWebPlan plan)
        {

            string query = "UPDATE IaaS_Web SET vm = @vm, cpu = @cpu, ram = @ram, storage = @storage, cost = @cost WHERE iwid = @iwid";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<IaaSWebPlan>(query, plan);

            }
            return Ok();
        }
    }
}
