using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Controllers;
using AzureCostCalculatorAPI.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Collections.Generic;

namespace AzureCostCalculatorAPI.Test.Controllers
{
    [TestClass]
    public class IaaSAPIControllerTest
    {
        [TestMethod]
        public async Task GetIaaSAPIPlanTest_Ok()
        {
            var mockRepo = new Mock<IIaaSAPIRepository>();
            var mockLogger = new Mock<ILogger<IaaSAPIController>>();
            
            mockRepo.Setup(x => x.GetAllIaaSApiPlans())
                .ReturnsAsync(new List<IaaSAPIPlan> { new IaaSAPIPlan(), new IaaSAPIPlan() });

            var controller = new IaaSAPIController(mockRepo.Object, mockLogger.Object);
            
            var result = await controller.GetAll();
            var okResult = result as ObjectResult;

            Assert.IsNotNull(okResult);
            Assert.IsTrue(okResult is ObjectResult);
            Assert.AreEqual(StatusCodes.Status200OK, okResult.StatusCode);
        }

        [TestMethod]
        public async Task GetIaaSAPIPlanTest_NotFound()
        {
            var mockRepo = new Mock<IIaaSAPIRepository>();
            var mockLogger = new Mock<ILogger<IaaSAPIController>>();

            mockRepo.Setup(x => x.GetAllIaaSApiPlans()).ReturnsAsync(new List<IaaSAPIPlan>());

            var controller = new IaaSAPIController(mockRepo.Object, mockLogger.Object);

            var result = await controller.GetAll();
            var notFoundResult = result as NotFoundResult;

            Assert.IsNotNull(notFoundResult);
            Assert.IsTrue(notFoundResult is NotFoundResult);
            Assert.AreEqual(StatusCodes.Status404NotFound, notFoundResult.StatusCode);
        }
    }
}