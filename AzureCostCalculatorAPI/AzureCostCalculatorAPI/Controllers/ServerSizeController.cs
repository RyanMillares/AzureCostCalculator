using Microsoft.AspNetCore.Mvc;
using AzureCostCalculatorAPI.Contract.Entities;
using AzureCostCalculatorAPI.Respositories;
using AutoMapper;
using AzureCostCalculatorAPI.DTOs;
using System.Net.Mime;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [ApiController]
    [Route("api/ServerSize")]
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
        /// <param name="sorted"> boolean for whether or not to sort server sizes.</param>
        /// <returns> A collection of ServerSizeGetDtos.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ServerSizeGetDto>>> GetServerSizes(bool sorted)
        {
            var serverSizes = await _repo.GetServerSizes(sorted);
            return serverSizes == null ? NotFound() : Ok(_mapper.Map<IEnumerable<ServerSizeGetDto>>(serverSizes));
        }

        ///<summary>
        /// Get all Sizes of the Servers
        /// </summary>
        /// <returns> A collection of the Sizes of ServerSizeGetDtos.</returns>
        [HttpGet("AvailableSizes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ServerSizeGetDto>>> GetDistinctSizes()
        {
            var sizes = await _repo.GetDistinctSizes();
            return sizes == null ? NotFound() : Ok(_mapper.Map<IEnumerable<ServerSizeGetDto>>(sizes));
        }

        ///<summary>
        /// Get Servers filtered by Distinct Sizes (small, medium, large, XL)
        /// </summary>
        /// <returns> A collection of ServerSizeGetDtos filtered by Distinct size.</returns>
        [HttpGet("FilterBySize")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ServerSizeGetDto>>> GetServersBySize(string size)
        {
            var serverSizes = await _repo.GetServersBySize(size);
            return serverSizes == null ? NotFound() : Ok(_mapper.Map<IEnumerable<ServerSizeGetDto>>(serverSizes));
        }

        ///<summary>
        /// Create a Server Size
        /// </summary>
        /// <param name="serverSize"> ServerSize to create.</param>
        /// <return>Status Code 201 If Create succeeds.</return>
        ///
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult CreateServerSize(ServerSizeCreateDto serverSize)
        {
            _repo.CreateServerSize(_mapper.Map<ServerSize>(serverSize));
            return StatusCode(StatusCodes.Status201Created);
        }

        ///<summary>
        /// Delete a Server Size
        /// </summary>
        /// <param name="id"> Guid id to remove Server Size.</param>
        /// <return>Status Code 200 If Delete succeeds.</return>
        ///
        [HttpDelete("{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult DeleteServerSize(Guid id)
        {
            _repo.DeleteServerSize(id);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}
