using AutoMapper;
using AzureCostCalculatorAPI.Contract.Entities;
using AzureCostCalculatorAPI.DTOs;
using AzureCostCalculatorAPI.Respositories;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Net.Mime;
using static System.Data.IDbConnection;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [ApiController]
    [Route("api/paasweb")]
    public class PaasWebController : ControllerBase
    {
        private readonly IPaasWebRepository _repo;
        private readonly IMapper _mapper;

        public PaasWebController(IPaasWebRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        /// <summary>
        /// Get all PaaS Web Plans
        /// </summary>
        /// <returns>A collection of PaaSWebPlanGetDtos</returns>

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<PaasWebPlanGetDto>>> GetPaasWebPlans()
        {
            var plans = await _repo.GetPaasWebPlans();
            return plans == null ? NotFound() : Ok(_mapper.Map<IEnumerable<PaasWebPlanGetDto>>(plans));
        }

        /// <summary>
        /// Create a PaaS Web Plan
        /// </summary>
        /// <param name="plan">PaaS Web Plan to create</param>
        /// <returns>Status Code 201 if Create succeds</returns>
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult CreatePaasWebPlan(PaasWebPlanCreateDTO plan)
        {
            _repo.CreatePaasWebPlan(_mapper.Map<PaasWebPlan>(plan));
            return StatusCode(StatusCodes.Status201Created);
        }
    }
}
