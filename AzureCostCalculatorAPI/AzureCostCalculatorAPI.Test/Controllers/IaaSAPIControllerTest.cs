using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Controllers;
using AzureCostCalculatorAPI.Respositories;
using Moq;

namespace AzureCostCalculatorAPI.Test.Controllers
{
    [TestClass]
    public class IaaSAPIControllerTest
    {
        [TestMethod]
        public async Task GetIaaSAPIPlanTest()
        {
            IaaSAPIPlan mockPlan = new IaaSAPIPlan
            {
                Cost = 2,
                CPU = 2,
                IAID = Guid.NewGuid(),
                RAM = 2,
                Storage = 2,
                VM = "hi"
            };

            Mock<IIaaSAPIRepository> mockRepo = new Mock<IIaaSAPIRepository>();
            mockRepo.Setup(x => x.GetIaaSAPIPlans())
                .ReturnsAsync(new List<IaaSAPIPlan> {
                mockPlan
            });

            IaaSAPIController controller = new IaaSAPIController(mockRepo.Object);
            List<IaaSAPIPlan> plans = await controller.GetIaaSAPIPlan();
            Assert.AreEqual(1, plans.Count);
            Assert.AreEqual(mockPlan, plans[0]);
        }
    }
}