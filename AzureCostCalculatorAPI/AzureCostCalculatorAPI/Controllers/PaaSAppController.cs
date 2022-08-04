﻿using AzureCostCalculatorAPI.Contract;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaaSAppController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the PaaS AppService plans
        public async Task<List<PaaSAppPlan>> GetPaaSAPIPlan()
        {
            using IDbConnection conn = new SqlConnection("Server=.;Trusted_Connection=True;Database=AzureResources;TrustServerCertificate=True;");
            var PaaSAPIData = await conn.QueryAsync<PaaSAppPlan>("select * from PaaS_AS");
            return PaaSAPIData.ToList();
        }
    }
}
