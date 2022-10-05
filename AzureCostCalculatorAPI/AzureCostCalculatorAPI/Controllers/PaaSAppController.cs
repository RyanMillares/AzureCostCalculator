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
    public class PaaSAppController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the PaaS AppService plans
        public async Task<List<PaaSAppPlan>> GetPaaSAPIPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var PaaSAPIData = await conn.QueryAsync<PaaSAppPlan>("select * from PaaS_AS");
            return PaaSAPIData.ToList();
        }
        [HttpPost]
        public async Task<IActionResult> Post(PaaSAppPlan plan)
        {

            String query = "INSERT INTO PaaS_AS (paid, name,cpu,ram,storage,cost) VALUES (default, @name, @cpu, @ram, @storage, @cost)";

            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using (var conn = new SqlConnection(myConnectorString))
            {
                await conn.OpenAsync();
                var affectedRows = await conn.QueryAsync<PaaSAppPlan>(query, plan);

            }

            return Ok();

        }
    }

}
