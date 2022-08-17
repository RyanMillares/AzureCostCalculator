using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using AzureCostCalculatorAPI.Contract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerSizeController : ControllerBase
    {
        // GET: api/<DatabaseController>
        [HttpGet]
        // Returns a list of all the server sizes (objects include 'small' and '3')
        public async Task<List<ServerSize>> Get()
        {
            using IDbConnection conn = new SqlConnection("Server=.\\sqlexpress;Trusted_Connection=True;Database=AzureResources;TrustServerCertificate=True;");
            var serverData = await conn.QueryAsync<ServerSize>("select * from ServerSizes");
            return serverData.ToList();
        }

        [HttpGet("{size}")]
        // Returns a list of distinct sizes: small, medium, large, XL
        public async Task<List<string>> GetDistinctSize()
        {
            using IDbConnection conn = new SqlConnection("Server=.\\sqlexpress;Trusted_Connection=True;Database=AzureResources;TrustServerCertificate=True;");
            var sizeData = await conn.QueryAsync<string>("SELECT DISTINCT SIZE FROM dbo.ServerSizes");
            return sizeData.ToList();
        }

        // GET api/<DatabaseController>/5
        [HttpGet("{id}")]
        // Returns a list of server numbers associated with given size ('small', etc)
        public async Task<List<int>> Get(string serverSize)
        {
            using IDbConnection conn = new SqlConnection("Server=.\\sqlexpress;Trusted_Connection=True;Database=AzureResources;TrustServerCertificate=True;");
            var serverData = await conn.QueryAsync<int>("select * from ServerSizes where size = @serverSize", new { serverSize });
            return serverData.ToList();
        }

        // PUT api/<DatabaseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DatabaseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
