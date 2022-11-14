using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using AzureCostCalculatorAPI.Contract.Entities;
using Microsoft.AspNetCore.Diagnostics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IaasWebController : ControllerBase
    {
        // GET: api/<DatabaseController>
        [HttpGet]
        // Returns a list of all the IaaS Web plans
        public async Task<List<IaasWebPlan>> GetIaaSWebPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var IaaSWebData = await conn.QueryAsync<IaasWebPlan>("select * from IaaS_Web");
            return IaaSWebData.ToList();
        }

        [HttpGet("{id}")]
        // Returns the IaaS web plan associated with the given GUID
        public async Task<IaasWebPlan> Get(Guid id)
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var plan = await conn.QuerySingleAsync<IaasWebPlan>("select * from IaaS_Web where iwid = @id", new { id });
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

            IaasWebPlan plan = new IaasWebPlan();
            plan.IwId = Guid.NewGuid();
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
                var affectedRows = await conn.QueryAsync<IaasWebPlan>(query, plan);

            }

            return Ok();

        }
        [HttpPut]
        public async Task<IActionResult> Put(IaasWebPlan plan)
        {

            string query = "UPDATE IaaS_Web SET vm = @vm, cpu = @cpu, ram = @ram, storage = @storage, cost = @cost WHERE iwid = @iwid";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<IaasWebPlan>(query, plan);

            }
            return Ok();
        }
    }
}
