using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureCostCalculatorAPI.Contract
{
    public class PaaSDBPlan
    {
        public Guid PDID { get; set; }

        public int? Cost { get; set; }
    }
}
