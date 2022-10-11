using AzureCostCalculatorAPI.Contract;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaaSDBController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the IaaS API plans
        public async Task<List<PaaSDBPlan>> GetPaaSDBPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var PaaSDBData = await conn.QueryAsync<PaaSDBPlan>("select * from PaaS_DB");
            return PaaSDBData.ToList();
        }
        [HttpPost]
        public async Task<IActionResult> Post(string type, string hardware, string instance, string storage, int cost)
        {
            PaaSDBPlan plan = new PaaSDBPlan();
            plan.PDID = Guid.NewGuid();
            plan.Type = type;
            plan.Hardware = hardware;
            plan.Instance = instance;
            plan.Storage = storage;
            plan.Cost = cost;   
            String query = "INSERT INTO PaaS_DB (pdid,type,hardware,storage,instance,cost) VALUES (default, @type, @hardware, @storage, @instance, @cost)";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<PaaSDBPlan>(query, plan);

            }

            return Ok();




        }
    }
}
