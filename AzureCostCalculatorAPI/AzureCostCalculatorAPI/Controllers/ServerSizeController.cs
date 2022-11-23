using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using AzureCostCalculatorAPI.Contract.Entities;
using Microsoft.AspNetCore.Diagnostics;
using AzureCostCalculatorAPI.Respositories;
using AutoMapper;
using AzureCostCalculatorAPI.DTOs;
using System.Net.Mime;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerSizeController : ControllerBase
    {
        private readonly IServerSizeRepository _repo;
        private readonly IMapper _mapper;

        public ServerSizeController(IServerSizeRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        ///<summary>
        /// Get all Server Sizes
        /// </summary>
        /// <returns> A collection of ServerSizeGetDtos.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ServerSizeGetDto>>> GetServerSize()
        {
            var serversizes = await _repo.GetServerSizes();
            return serversizes == null ? NotFound() : Ok(_mapper.Map<IEnumerable<ServerSizeGetDto>>(serversizes));
        }

        ///<summary>
        /// Create a Server Size
        /// </summary>
        /// <param name="serversize"> ServerSize to create.</param>
        /// <return>Status Code 201 If Create succeeds.</return>
        /// TEST DATA Large 28, Small 8 
        ///
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult CreateServerSize(ServerSizeCreateDto serversize)
        {
            _repo.CreateServerSize(_mapper.Map<ServerSize>(serversize));
            return StatusCode(StatusCodes.Status201Created);
        }

        ///<summary>
        /// Get all Server Sizes Sorted
        /// </summary>
        /// <returns> A collection of Sorted ServerSizeGetDtos.</returns>
        [HttpGet("Sorted")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ServerSizeGetDto>>> GetSorted()
        {
            var serversizes = await _repo.GetSorted();
            return serversizes == null ? NotFound() : Ok(_mapper.Map<IEnumerable<ServerSizeGetDto>>(serversizes));
        }
        /*
       
        //- Note -> I get Sizes but in the format of the ServerSizeGetDto with blank ssid and servers, but it works!  
        ///<summary>
        /// Get all Sizes of the Servers
        /// </summary>
        /// <returns> A collection of the Sizes of ServerSizeGetDtos.</returns>
        [HttpGet("Sizes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ServerSizeGetDto>>> GetDistinctSize()
        {
            var serversizes = await _repo.GetDistinctSize();
            return serversizes == null ? NotFound() : Ok(_mapper.Map<IEnumerable<ServerSizeGetDto>>(serversizes));
        }
        */

        [HttpGet("Sizes")]
        // Returns a list of distinct sizes: small, medium, large, XL
        public async Task<List<string>> GetDistinctSize()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");

            using IDbConnection conn = new SqlConnection(myConnectorString);
            var sizeData = await conn.QueryAsync<string>("SELECT DISTINCT SIZE FROM dbo.ServerSizes");
            return sizeData.ToList();
        }

        // - Note -> Not sure how Get Id and Delete Id works 
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

        // DELETE api/<DatabaseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
