using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Respositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class IaaSAPIController : ControllerBase
{
    private readonly IIaaSAPIRepository _repo;
    private readonly ILogger<IaaSAPIController> _logger;
    
    public IaaSAPIController(IIaaSAPIRepository repo, ILogger<IaaSAPIController> logger)
    {
        _repo = repo;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var plans = await _repo.GetAllIaaSApiPlans();

            if (plans is not null && plans.Any())
            {
                return Ok(plans);
            }
                        
            return NotFound();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TODO: Say something useful.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
    public IActionResult Create([FromBody] IaaSAPIPlan model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        try
        {
            _repo.CreateIaaSApiPlan(model);
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TODO: Say something useful.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
