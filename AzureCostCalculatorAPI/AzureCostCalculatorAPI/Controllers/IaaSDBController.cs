using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Intrinsics.Arm;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IaasDbController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the IaaS API plans
        public async Task<List<IaasDbPlan>> GetIaaSDBPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using IDbConnection conn = new SqlConnection(myConnectorString);
            var IaaSDBData = await conn.QueryAsync<IaasDbPlan>("select * from IaaS_DB");
            return IaaSDBData.ToList();
        }
        [HttpPost]
        public async Task<IActionResult> Post(string vm, int cpu, int ram, int storage, int cost)
        {
            IaasDbPlan plan = new IaasDbPlan();
            plan.IdId = Guid.NewGuid();
            plan.VM = vm;
            plan.CPU = cpu;
            plan.RAM = ram;
            plan.Storage = storage;
            plan.Cost = cost;
            String query = "INSERT INTO IaaS_DB (idid, vm,cpu,ram,storage,cost) VALUES (default, @vm, @cpu, @ram, @storage, @cost)";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<IaasDbPlan>(query, plan);

            }

            return Ok();

        }
        [HttpPut]
        public async Task<IActionResult> Put(IaasDbPlan plan)
        {

            string query = "UPDATE IaaS_DB SET vm = @vm, cpu = @cpu, ram = @ram, storage = @storage, cost = @cost WHERE idid = @idid";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<IaasDbPlan>(query, plan);

            }
            return Ok();
        }
    }
}
