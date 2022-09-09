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
    }
}
