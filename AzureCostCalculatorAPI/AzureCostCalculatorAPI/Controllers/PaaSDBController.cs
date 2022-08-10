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
            using IDbConnection conn = new SqlConnection("Server=.\\sqlexpress;Trusted_Connection=True;Database=AzureResources;TrustServerCertificate=True;");
            var PaaSDBData = await conn.QueryAsync<PaaSDBPlan>("select * from PaaS_DB");
            return PaaSDBData.ToList();
        }
    }
}
