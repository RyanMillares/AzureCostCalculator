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
    public class PaaSWebController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the PaaS Website plans
        public async Task<List<PaaSWebPlan>> GetPaaSWebPlan()
        {
            using IDbConnection conn = new SqlConnection("Server=.;Trusted_Connection=True;Database=AzureResourcesDB;TrustServerCertificate=True;");
            var PaaSWebData = await conn.QueryAsync<PaaSWebPlan>("select * from PaaS_Web");
            return PaaSWebData.ToList();
        }

        [HttpGet("{id}")]
        // Returns the IaaS web plan associated with the given GUID
        public async Task<PaaSWebPlan> Get(Guid id)
        {
            using IDbConnection conn = new SqlConnection("Server=.;Trusted_Connection=True;Database=AzureResourcesDB;TrustServerCertificate=True;");
            var plan = await conn.QuerySingleAsync<PaaSWebPlan>("select * from PaaS_Web where pwid = @id", new { id });
            return plan;
        }
    }
}
