using AutoMapper;
using AutoMapper.Execution;
using AzureCostCalculatorAPI.Contract.Entities;
using AzureCostCalculatorAPI.Controllers;
using AzureCostCalculatorAPI.DTOs;
using AzureCostCalculatorAPI.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace AzureCostCalculatorAPI.Test.Controllers
{
    [TestClass]
    public class IaaSAPIControllerTest
    {
        [TestMethod]
        public async Task GetIaaSAPIPlanTest_Ok()
        {
            var mockRepo = new Mock<IIaasApiRepository>();
            var mockMapper = new Mock<IMapper>();
            
            mockRepo.Setup(x => x.GetIaasApiPlans())
                .ReturnsAsync(new List<IaasApiPlan> { new IaasApiPlan(), new IaasApiPlan() });

            var controller = new IaasApiController(mockRepo.Object, mockMapper.Object);
            
            var actionResult = await controller.GetIaaSApiPlans();
            var result = actionResult.Result as OkObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(StatusCodes.Status200OK, result.StatusCode);
        }

        // TODO: Need to fix this.
        //[TestMethod]
        //public async Task GetIaaSAPIPlanTest_NotFound()
        //{
        //    var mockRepo = new Mock<IIaasApiRepository>();
        //    var mockMapper = new Mock<IMapper>();
        //    mockRepo.Setup(r => r.GetIaasApiPlans()).ReturnsAsync<>.ReturnsAsync(Task.FromResult<IEnumerable<IaasApiPlanGetDto>>(null));

        //    var controller = new IaasApiController(mockRepo.Object, mockMapper.Object);

        //    var actionResult = await controller.GetIaaSApiPlans();
        //    var result = actionResult.Result as NotFoundObjectResult;
            
        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(StatusCodes.Status404NotFound, result.StatusCode);
        //}
    }
}