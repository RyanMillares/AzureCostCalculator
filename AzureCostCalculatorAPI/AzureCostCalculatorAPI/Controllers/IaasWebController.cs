using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using AzureCostCalculatorAPI.Contract.Entities;
using Microsoft.AspNetCore.Diagnostics;
using AzureCostCalculatorAPI.DTOs;
using AzureCostCalculatorAPI.Respositories;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IaasWebController : ControllerBase
{
    private readonly IIaasWebRepository _repo;
    private readonly IMapper _mapper;

    public IaasWebController(IIaasWebRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    // GET: api/<DatabaseController>
    /// <summary>
    /// Get all IAAS Web plans
    /// </summary>
    /// <returns>A collection of IaasWebPlanGetDtos</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<IaasWebPlanGetDto>>> GetIaaSWebPlans()
    {
        var plans = await _repo.GetIaasWebPlans();
        return plans == null ? NotFound() : Ok(_mapper.Map<IEnumerable<IaasWebPlanGetDto>>(plans));
    }

    /// <summary>
    /// Fetches IAAS Web Plan from specified GUID.
    /// </summary>
    /// <param name="id">IAAS Web Plan to fetch</param>
    /// <returns>A single IaasWebPlanGetDto</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<IaasApiPlanGetDto>>> GetIaaSWebPlan(Guid id)
    {
        var plan = await _repo.GetIaasWebPlan(id);
        return plan == null ? NotFound() : Ok(_mapper.Map<IEnumerable<IaasWebPlanGetDto>>(plan));
    }


    /// <summary>
    /// Create an IAAS Web Plan.
    /// </summary>
    /// <param name="plan">IAAS Web Plan to create.</param>
    /// <returns>Status Code 201 if Create succeeds.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult CreateIaaSWebPlan(IaasWebPlanCreateDto plan)
    {
        _repo.CreateIaasWebPlan(_mapper.Map<IaasWebPlan>(plan));
        return StatusCode(StatusCodes.Status201Created);
    }

    /// <summary>
    /// Updates a specified IAAS Web Plan.
    /// </summary>
    /// <param name="plan">IAAS API Plan to update.</param>
    /// <returns>Status code 200 if Update succeeds.</returns>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult UpdateIaaSWebPlan(IaasWebPlanUpdateDto plan)
    {
        _repo.UpdateIaasWebPlan(_mapper.Map<IaasWebPlan>(plan));
        return StatusCode(StatusCodes.Status201Created);
    }
}

