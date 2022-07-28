using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AzureCostCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalulatorController : ControllerBase
    {
        private string appSize;
        private int numServers;
        public CalulatorController()
        {
            this.appSize = "Small";
        }
        // GET: api/<CalulatorController>

        // THIS IS WHERE USER CONFIGURES PLAN
        [HttpGet("configure")]
        public List<string> GetPlan([FromQuery] string appSize, [FromQuery] int numServers)
        {
            List<string> plan = new List<string>();
            if (numServers == 3)
            {
                plan.Add("Web: VM Configuration: ");
            }
            return plan;
            /*this.appSize = appSize;
            this.numServers = numServers;
            int numTiers = numServers / 3; 
            // do big if statement here, add parameters to Get()
            return new string[] { "value1", "value2" }; */
        }

        // Returns list of sizes to be displayed
        [HttpGet("size")]
        public List<string> GetSize()
        {
            return new List<string> { "Small" };
            //return new List<string> { "Small", "Medium", "Large", "XL" };
        }

        // Returns list of types to be displayed
        [HttpGet("type")]
        public List<string> GetServiceType()
        {
            return new List<string> { "IaaS" };
            //return new List<string> { "IaaS", "PaaS" };
        }

        // Returns number of servers to display (based off of size chosen)
        [HttpGet("servers")]
        public List<int> GetNumServers()
        {
            return new List<int> { 3, 6, 9 };

            /*if (appSize.Equals("Small"))
            {
                return new List<int> { 3, 6, 9 };
            }
            else if (appSize.Equals("Medium"))
            {
                return new List<int> { 12, 15, 18 };
            }
            else if (appSize.Equals("Large"))
            {
                return new List<int> { 21, 24, 27 };
            } else // appSize.Equals("XL")
            {
                return new List<int> { 30, 33, 36 };
            }*/
            
        }

        // Returns list of VM configurations to be displayed
        [HttpGet("Web")]
        public List<string> GetWebVM()
        {
            return new List<string> { "D1_v2 CPU: 1, RAM: 3.5 , Storage: 50, Price: $15", "D2_v3 CPU: 2 , RAM: 8 , Storage: 50, Price: $27",
            "D4s_v3 CPU: 4 , RAM: 16 , Storage: 32, Price: $54"
            };
            //return new List<string> { "IaaS", "PaaS" };
        }

        // GET api/<CalulatorController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CalulatorController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CalulatorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CalulatorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
