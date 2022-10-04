using AzureCostCalculatorAPI.Contract;
using Microsoft.EntityFrameworkCore;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client.Extensions.Msal;
using System.Data;
using System.Data.SqlClient;
using static System.Data.IDbConnection;

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
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var PaaSWebData = await conn.QueryAsync<PaaSWebPlan>("select * from PaaS_Web");
            return PaaSWebData.ToList();
        }

        [HttpGet("{id}")]
        // Returns the IaaS web plan associated with the given GUID
        public async Task<PaaSWebPlan> Get(Guid id)
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var plan = await conn.QuerySingleAsync<PaaSWebPlan>("select * from PaaS_Web where pwid = @id", new { id });
            return plan;
        }
        [HttpPost("paasweb/Post")]
        public async Task<PaaSWebPlan> Post(String pwid, String name, int cpu, int ram, int storage, int cost)
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using IDbConnection conn = new SqlConnection(myConnectorString);

            String sql = $"INSERT INTO PaaSWeb (pwid,name,cpu,ram,storage,cost) VALUES ({pwid},{name}, {cpu}, {ram}, {storage}, {cost})";
   
            
            //return plan;

            
            String query = "INSERT INTO PaaSWeb (pwid, name,cpu,ram,storage,cost) VALUES (@pwid, @name, @cpu, @ram, @storage, @cost)";

            SqlCommand command = new SqlCommand(query);
            //command.Connection = conn;
            command.Parameters.AddWithValue("@pwid", pwid);
            command.Parameters.AddWithValue("@name", name);
            command.Parameters.AddWithValue("@cpu", cpu);
            command.Parameters.AddWithValue("@ram", ram);
            command.Parameters.AddWithValue("@storage", storage);
            command.Parameters.AddWithValue("@cost", cost);

            conn.Open();
            var result = command.ExecuteNonQuery();

            if (result < 0)
                Console.WriteLine("Error inserting data!");

                //return result;
            
            //Console.WriteLine(sql);
            var plan = await conn.QuerySingleAsync<PaaSWebPlan>(sql);
            return plan;


        }
    }
}
