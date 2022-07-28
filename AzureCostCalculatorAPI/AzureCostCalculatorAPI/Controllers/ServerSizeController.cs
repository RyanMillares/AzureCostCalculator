using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;

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
            using IDbConnection conn = new SqlConnection("Server=WHAT.database.windows.net;User=WHAT;Password=WHAT;Database=WHAT;");
            var serverData = await conn.QueryAsync<ServerSize>("select * from ServerSizes");
            return serverData.ToList();
        }

        // GET api/<DatabaseController>/5
        [HttpGet("{id}")]
        // Returns a list of server numbers associated with given size ('small', etc)
        public Task<List<int>> Get(string serverSize)
        {
            using IDbConnection conn = new SqlConnection("Server=WHAT.database.windows.net;User=WHAT;Password=WHAT;Database=WHAT;");
            var serverData = await conn.QueryAsync<int>("select * from ServerSizes where size = @serverSize", new { serverSize });
            return serverData.ToList();
        }

        // POST api/<DatabaseController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
