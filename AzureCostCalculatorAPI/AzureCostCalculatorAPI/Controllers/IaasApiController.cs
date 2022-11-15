using AutoMapper;
using AzureCostCalculatorAPI.Contract.Entities;
using AzureCostCalculatorAPI.DTOs;
using AzureCostCalculatorAPI.Respositories;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers;

[ApiController]
[Route("api/iaasapi")]
//[Route("api/[controller]")] << this is the same as the above, but uses a variable instead of hardcoding
public class IaasApiController : ControllerBase
{
    private readonly IIaasApiRepository _repo;
    private readonly IMapper _mapper;

    public IaasApiController(IIaasApiRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    /// <summary>
    /// Get all IAAS API Plans.
    /// </summary>
    /// <returns>A collection of IaasApiPlanGetDtos.</returns>
    [HttpGet]    
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]    
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<IaasApiPlanGetDto>>> GetIaaSApiPlans()
    {        
        var plans = await _repo.GetIaasApiPlans();
        return plans == null ? NotFound() : Ok(_mapper.Map<IEnumerable<IaasApiPlanGetDto>>(plans));
    }

    /// <summary>
    /// Create an IAAS API Plan.
    /// </summary>
    /// <param name="plan">IAAS API Plan to create.</param>
    /// <returns>Status Code 201 if Create succeeds.</returns>    
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult CreateIaaSApiPlan(IaasApiPlanCreateDto plan)
    {
        _repo.CreateIaasApiPlan(_mapper.Map<IaasApiPlan>(plan));
        return StatusCode(StatusCodes.Status201Created);
    }
}
