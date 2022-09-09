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
    public class IaaSDBController : ControllerBase
    {
        [HttpGet]
        // Returns a list of all the IaaS API plans
        public async Task<List<IaaSDBPlan>> GetIaaSDBPlan()
        {
            var myConnectorString = ConfigHandler.GetByName("SqlConnectorString");
            using IDbConnection conn = new SqlConnection(myConnectorString);
            var IaaSDBData = await conn.QueryAsync<IaaSDBPlan>("select * from IaaS_DB");
            return IaaSDBData.ToList();
        }
    }
}
