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
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var serverData = await conn.QueryAsync<ServerSize>("select * from ServerSizes");
            return serverData.ToList();
        }
        // GET api/<DatabaseController>/Sorted
        [HttpGet("Sorted")]
        // Returns a list all the server sizes sorted by servers in ascending order (3, 6, 9, etc.)
        public async Task<List<ServerSize>> GetSorted()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using IDbConnection conn = new SqlConnection(myConnectorString);

            var sortedData = await conn.QueryAsync<ServerSize>("select * from ServerSizes order by servers");

            return sortedData.ToList();
        }

        [HttpGet("Sizes")]
        // Returns a list of distinct sizes: small, medium, large, XL
        public async Task<List<string>> GetDistinctSize()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var sizeData = await conn.QueryAsync<string>("SELECT DISTINCT SIZE FROM dbo.ServerSizes");
            return sizeData.ToList();
        }

 

        // GET api/<DatabaseController>/5
        [HttpGet("{id}")]
        // Returns a list of server numbers associated with given size ('small', etc)
        public async Task<List<int>> Get(string serverSize)
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
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
